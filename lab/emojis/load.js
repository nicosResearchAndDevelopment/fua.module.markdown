const
    assert  = require('@nrd/fua.core.assert'),
    is      = require('@nrd/fua.core.is'),
    tty     = require('@nrd/fua.core.tty'),
    async   = require('@nrd/fua.core.async'),
    fs      = require('fs/promises'),
    {JSDOM} = require('jsdom');

async.iife(async function Main() {

    // const unicode_1_1 = await getRelevantEmojiDataList('unicode-1.1');
    // await fs.writeFile('unicode-1.1.json', JSON.stringify(unicode_1_1, null, 2));
    const unicode_1_1 = JSON.parse(await fs.readFile('unicode-1.1.json'));

    // const emoji_1_0 = await getRelevantEmojiDataList('emoji-1.0');
    // await fs.writeFile('emoji-1.0.json', JSON.stringify(emoji_1_0, null, 2));
    // const emoji_1_0 = JSON.parse(await fs.readFile('emoji-1.0.json'));

    const emojiMap = new Map([...unicode_1_1].map(entry => [entry.id, entry]));
    const emojis   = Object.fromEntries(Array.from(emojiMap.values())
        .sort((a, b) => a.shortcode < b.shortcode ? -1 : 1)
        .map(entry => [entry.shortcode, String.fromCodePoint(entry.codepoint)]));
    await fs.writeFile('emojis.json', JSON.stringify(emojis, null, 2));

    tty.log.success();

});

async function getDocument(slug) {
    assert.string(slug);
    const url         = new URL(slug, 'https://emojipedia.org/');
    const contentType = 'text/html';
    const response    = await fetch(url, {headers: {'Accept': contentType}});
    assert(response.ok, 'failed response');
    const content  = await response.text();
    const dom      = new JSDOM(content, {url, contentType});
    const document = dom?.window?.document;
    assert(document, 'no document');
    return document;
}

async function getPageData(slug) {
    const doc      = await getDocument(slug);
    const dataElem = doc.querySelector('script[type="application/json"]');
    assert(dataElem, 'data not found');
    return JSON.parse(dataElem.innerHTML);
}

async function getSlugData(slug) {
    const data    = await getPageData(slug);
    const queries = data?.props?.pageProps?.dehydratedState?.queries;
    assert(is.array(queries), `expected queries to be an array (at ${slug})`);
    const slugData = queries.find(query => query?.queryKey?.includes(slug))?.state?.data;
    assert(is.object(slugData), `expected slugData to be an object (at ${slug})`);
    return slugData;
}

async function getEmojiData(slug) {
    return await getSlugData(slug);
}

async function getRelevantEmojiData(slug) {
    const data = await getEmojiData(slug);
    assert(slug === data.slug, 'unexpected slug');
    const id = data.slug;
    assert(is.string(id), `expected id to be a string (at ${slug})`);
    const label = data.currentCldrName ?? data.title ?? data.appleName;
    assert(is.string(label), `expected label to be a string (at ${slug})`);
    const codepoint = data.codepointsHex?.at(0)?.replace('U+', '0x') ?? null;
    assert(is.null(codepoint) || is.string.token(codepoint), `expected codepoint to be a token string (at ${slug})`);
    const shortcode = data.shortcodes?.find(entry => entry.source === 'cldr')?.code?.replace(/:/g, '') ?? null;
    assert(is.null(shortcode) || is.string.token(shortcode), `expected shortcode to be a token string (at ${slug})`);
    return {id, label, codepoint, shortcode};
}

async function getEmojiListData(slug) {
    const slugData = await getSlugData(slug);
    const listData = is.array(slugData) ? slugData : slugData.emoji;
    assert(is.array(listData), `expected listData to be an array (at ${slug})`);
    return listData;
}

async function getRelevantEmojiDataList(slug) {
    const listData         = await getEmojiListData(slug);
    const maxRetries       = 5, maxConcurrent = 10;
    const taskQueue        = listData.map(emojiData => async.retry(() => getRelevantEmojiData(emojiData.slug), maxRetries));
    const relevantDataList = await async.queue(taskQueue, maxConcurrent);
    assert(listData.length === relevantDataList.length, `expected listData and relevantDataList to have the same length (at ${slug})`);
    return relevantDataList;
}
