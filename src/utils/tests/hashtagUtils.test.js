import { parseHashtags, validateHashtagLimits, getHashtagCounts } from '../hashtagUtils';

describe('hashtagUtils', () => {
  test('parseHashtags handles various inputs', () => {
    expect(parseHashtags('')).toEqual(['#favorite']);
    expect(parseHashtags('#test')).toEqual(['#test']);
    expect(parseHashtags('test1,test2 #test3')).toEqual(['#test1', '#test2', '#test3']);
    expect(parseHashtags('  #duplicate   #duplicate ')).toEqual(['#duplicate']);
  });

  test('validateHashtagLimits throws errors', () => {
    const videos = [
      { hashtags: ['#test'] },
      ...Array(9).fill({ hashtags: ['#limit'] })
    ];

    // Valid case
    expect(() => validateHashtagLimits(['#test'], videos)).not.toThrow();
    
    // Exceeding limit
    expect(() => validateHashtagLimits(['#limit'], videos))
      .toThrow('"#limit" has reached 10 video limit');
  });

  test('getHashtagCounts returns correct counts', () => {
    const videos = [
      { hashtags: ['#a', '#b'] },
      { hashtags: ['#a'] }
    ];
    expect(getHashtagCounts(videos)).toEqual({ '#a': 2, '#b': 1 });
  });
});