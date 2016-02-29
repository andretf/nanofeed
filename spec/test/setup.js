'use strict';

var TestResponse = {
  empty: '',
  html: '<html></html>',
  xml: '<xml></xml>',
  rss: '<rss>',
  json: '{"just another":"json"}',
  errorJson: '{"query":{"error":""}}',
  noResult: '{"query":{"count":0,"created":"2016-02-26T17:32:13Z","lang":"en-US","results":null}}',
  withResults: {
    fields: {
      all: JSON.stringify({"query":{"count":1,"results":{"results":{"item":[{"title":"Ex-Michigan Lawmakers Face Felony Charges Over Affair - ABC News","link":"http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNELvlYHIrmFSJVrIkrh0D47R3_Egg&clid=c3a7d30bb8a4878e06b80cf16b898331&cid=52779053143807&ei=V-bQVrDJDJXL3gGqi4aICg&url=http://abcnews.go.com/Politics/wireStory/lawmakers-forced-office-affair-face-charges-37226059","pubDate":"Fri, 26 Feb 2016 23:28:00 GMT","description":"<table border=\"0\" cellpadding=\"2\" cellspacing=\"7\" style=\"vertical-align:top;\"><tr><td width=\"80\" align=\"center\" valign=\"top\"><font style=\"font-size:85%;font-family:arial,sans-serif\"></font></td><td valign=\"top\" class=\"j\"><font style=\"font-size:85%;font-family:arial,sans-serif\"><br><div style=\"padding-top:0.8em;\"><img alt=\"\" height=\"1\" width=\"1\"></div><div class=\"lh\"><a href=\"http://news.google.com/news/url?sa=t&amp;fd=R&amp;ct2=us&amp;usg=AFQjCNELvlYHIrmFSJVrIkrh0D47R3_Egg&amp;clid=c3a7d30bb8a4878e06b80cf16b898331&amp;cid=52779053143807&amp;ei=V-bQVrDJDJXL3gGqi4aICg&amp;url=http://abcnews.go.com/Politics/wireStory/lawmakers-forced-office-affair-face-charges-37226059\"><b>Ex-Michigan Lawmakers Face Felony Charges Over Affair</b></a><br><font size=\"-1\"><b><font color=\"#6f6f6f\">ABC News</font></b></font><br><font size=\"-1\">Two former Michigan lawmakers were charged Friday with felony misconduct in office, the state attorney general announced, after their extramarital affair snowballed into a political scandal when one of them concocted a bizarre cover story about being <b>...</b></font><br><font size=\"-1\" class=\"p\"></font><br><font class=\"p\" size=\"-1\"><a class=\"p\" href=\"http://news.google.com/news/more?ncl=d6w5NeJe4YJhR1M&amp;authuser=0&amp;ned=us&amp;topic=h\"><nobr><b>and more&nbsp;&raquo;</b></nobr></a></font></div></font></td></tr></table>"},{"title":"The Latest: Mixed Reports as Cease-Fire Takes Hold in Syria - New York Times","link":"http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNEzwqk9on4KyXkJ6Xju4B4FI80Ysw&clid=c3a7d30bb8a4878e06b80cf16b898331&cid=52779053537015&ei=V-bQVrDJDJXL3gGqi4aICg&url=http://www.nytimes.com/aponline/2016/02/26/world/middleeast/ap-ml-syria-the-latest.html","pubDate":"Fri, 26 Feb 2016 23:26:15 GMT","description":"<table border=\"0\" cellpadding=\"2\" cellspacing=\"7\" style=\"vertical-align:top;\"><tr><td width=\"80\" align=\"center\" valign=\"top\"><font style=\"font-size:85%;font-family:arial,sans-serif\"><a href=\"http://news.google.com/news/url?sa=t&amp;fd=R&amp;ct2=us&amp;usg=AFQjCNFBsMLODggpYqFw2eRS4JEW63fqaQ&amp;clid=c3a7d30bb8a4878e06b80cf16b898331&amp;cid=52779053537015&amp;ei=V-bQVrDJDJXL3gGqi4aICg&amp;url=https://www.rt.com/news/333787-syria-ceasefire-aleppo-phelan/\"><img src=\"//t2.gstatic.com/images?q=tbn:ANd9GcS28oklCGqViOod23GRZMROU87iyfANsIMqTckfr9VKhOlhQmB7Rfa82tXICRJjuck1sIU0Rq4l\" alt=\"\" border=\"1\" width=\"80\" height=\"80\"><br><font size=\"-2\">RT</font></a></font></td><td valign=\"top\" class=\"j\"><font style=\"font-size:85%;font-family:arial,sans-serif\"><br><div style=\"padding-top:0.8em;\"><img alt=\"\" height=\"1\" width=\"1\"></div><div class=\"lh\"><a href=\"http://news.google.com/news/url?sa=t&amp;fd=R&amp;ct2=us&amp;usg=AFQjCNEzwqk9on4KyXkJ6Xju4B4FI80Ysw&amp;clid=c3a7d30bb8a4878e06b80cf16b898331&amp;cid=52779053537015&amp;ei=V-bQVrDJDJXL3gGqi4aICg&amp;url=http://www.nytimes.com/aponline/2016/02/26/world/middleeast/ap-ml-syria-the-latest.html\"><b>The Latest: Mixed Reports as Cease-Fire Takes Hold in Syria</b></a><br><font size=\"-1\"><b><font color=\"#6f6f6f\">New York Times</font></b></font><br><font size=\"-1\">BEIRUT — The Latest on the conflict in Syria and the provisional cease-fire proposed by the U.S. and Russia that is to go into effect at midnight (all times local): 1:00 a.m.. The Associated Press reporters in the Syrian capital, Damascus, have not <b>...</b></font><br><font size=\"-1\"><a href=\"http://news.google.com/news/url?sa=t&amp;fd=R&amp;ct2=us&amp;usg=AFQjCNFBIenOEqsEOL7PAP-SlPvxnBCdOg&amp;clid=c3a7d30bb8a4878e06b80cf16b898331&amp;cid=52779053537015&amp;ei=V-bQVrDJDJXL3gGqi4aICg&amp;url=http://www.reuters.com/article/us-mideast-crisis-syria-cessation-idUSKCN0VZ2Z6\">Syria fighting largely halts as cessation begins: monitoring groups</a><font size=\"-1\" color=\"#6f6f6f\"><nobr>Reuters</nobr></font></font><br><font size=\"-1\"><a href=\"http://news.google.com/news/url?sa=t&amp;fd=R&amp;ct2=us&amp;usg=AFQjCNGdWXZ3pKlKx4eo1vs7SppOhDCtXw&amp;clid=c3a7d30bb8a4878e06b80cf16b898331&amp;cid=52779053537015&amp;ei=V-bQVrDJDJXL3gGqi4aICg&amp;url=http://www.latimes.com/world/middleeast/la-fg-syria-cease-fire-20160226-story.html\">Syrian cease-fire takes effect amid widespread doubt that it will hold</a><font size=\"-1\" color=\"#6f6f6f\"><nobr>Los Angeles Times</nobr></font></font><br><font size=\"-1\"><a href=\"http://news.google.com/news/url?sa=t&amp;fd=R&amp;ct2=us&amp;usg=AFQjCNGL8_VDr0pWdls-ph1Vj99wOyEXuQ&amp;clid=c3a7d30bb8a4878e06b80cf16b898331&amp;cid=52779053537015&amp;ei=V-bQVrDJDJXL3gGqi4aICg&amp;url=https://www.washingtonpost.com/world/middle_east/in-push-ahead-of-truce-syrian-troops-take-villages-from-is/2016/02/26/3c0c5c66-dc72-11e5-8210-f0bd8de915f6_story.html\">US, Russia-brokered cease-fire goes into effect across Syria</a><font size=\"-1\" color=\"#6f6f6f\"><nobr>Washington Post</nobr></font></font><br><font size=\"-1\" class=\"p\"><a href=\"http://news.google.com/news/url?sa=t&amp;fd=R&amp;ct2=us&amp;usg=AFQjCNFZEhrfiymCS4Ngf0de91fGW3p-1w&amp;clid=c3a7d30bb8a4878e06b80cf16b898331&amp;cid=52779053537015&amp;ei=V-bQVrDJDJXL3gGqi4aICg&amp;url=http://www.wsj.com/articles/fighting-rages-in-syria-on-eve-of-partial-cease-fire-1456485584\"><nobr>Wall Street Journal</nobr></a>&nbsp;-<a href=\"http://news.google.com/news/url?sa=t&amp;fd=R&amp;ct2=us&amp;usg=AFQjCNHjL_OCYH1sJqGYvpm5FoVI_zB9MQ&amp;clid=c3a7d30bb8a4878e06b80cf16b898331&amp;cid=52779053537015&amp;ei=V-bQVrDJDJXL3gGqi4aICg&amp;url=http://www.cbsnews.com/news/syria-cease-fire-takes-effect/\"><nobr>CBS News</nobr></a>&nbsp;-<a href=\"http://news.google.com/news/url?sa=t&amp;fd=R&amp;ct2=us&amp;usg=AFQjCNHAibBjrQH33rZG6kXt4QzyWOLf7A&amp;clid=c3a7d30bb8a4878e06b80cf16b898331&amp;cid=52779053537015&amp;ei=V-bQVrDJDJXL3gGqi4aICg&amp;url=http://abcnews.go.com/US/wireStory/expected-announce-date-syria-peace-talks-37228256\"><nobr>ABC News</nobr></a></font><br><font class=\"p\" size=\"-1\"><a class=\"p\" href=\"http://news.google.com/news/more?ncl=d-jBNvTDW4rZlbMqr0g6ppilt2GaM&amp;authuser=0&amp;ned=us&amp;topic=h\"><nobr><b>all 2,744 news articles&nbsp;&raquo;</b></nobr></a></font></div></font></td></tr></table>"}]}}}}),
      default: JSON.stringify({"query":{"count":1,"results":{"results":{"item":[{"title":"Ex-Michigan Lawmakers Face Felony Charges Over Affair - ABC News","link":"http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNELvlYHIrmFSJVrIk…om/Politics/wireStory/lawmakers-forced-office-affair-face-charges-37226059"},{"title":"The Latest: Mixed Reports as Cease-Fire Takes Hold in Syria - New York Times","link":"http://news.google.com/news/url?sa=t&fd=R&ct2=us&usg=AFQjCNEzwqk9on4KyXkJ6X…times.com/aponline/2016/02/26/world/middleeast/ap-ml-syria-the-latest.html"}]}}}}),
      onlyTitle: JSON.stringify({"query":{"count":1,"results":{"results":{"item":[{"title":"Ex-Michigan Lawmakers Face Felony Charges Over Affair - ABC News"},{"title":"The Latest: Mixed Reports as Cease-Fire Takes Hold in Syria - New York Times"}]}}}}),
      noTitle: JSON.stringify({"query":{"count":1,"results":{"results":{"item":[{"pubDate":"Fri, 26 Feb 2016 23:28:00 GMT"},{"pubDate":"Fri, 26 Feb 2016 23:26:15 GMT"}]}}}}),
      none: JSON.stringify({"query":{"count":1,"results":{"results":{"item":[{},{}]}}}})
    }
  }
};

var urls = {
  invalid: {},
  valid: {},
  init: function () {
    urls.invalid = {
      null: {value: null},
      undefined: {value: undefined},
      function: {
        value: function () {
        }
      },
      object: {value: {}},
      number: {value: 0},
      date: {value: new Date()},
      regexp: {value: /./},
      arrayEmpty: {value: []},
      arrayNotString: {value: [{}]},
      stringArray: {value: ['', 'anything']},
      string: {value: 'anything'},
      invalidJSON: {value: 'news.google.com'}
    };
    urls.valid = {
      stringArray: {
        value: [
          'news.google.com/news?output=rss',
          'news.google.com/news?hl=pt-BR&ned=pt-BR_br&output=rss']
      },
      string: {value: 'news.google.com/news?output=rss'}
    };
    return this;
  },
  foreach: function(callback){
    ['valid', 'invalid'].forEach(function (property) {
      var urlsCategory = urls[property];
      Object.keys(urlsCategory).forEach(function (key) {
        callback(urlsCategory[key]);
      });
    });

    return this;
  }
};

function getContextWithFakeResponse(response) {
  var thisArg = window;
  thisArg.XMLHttpRequest = fakeXMLHTTPRequest.withResponse(response);
  return thisArg;
}
function getContextWithFakeRequest(fakeXMLHTTPRequest) {
  var thisArg = window;
  thisArg.XMLHttpRequest = fakeXMLHTTPRequest;
  return thisArg;
}
