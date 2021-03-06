'use strict';

let articles = [];

// COMMENT: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// The following function is a constructor function to create new instances. It is capitalized to idenify it as an object constructor/it is a common naming convention. 'This' is the keyword used to indicate the property belongs to the object of this function. Lastly, rawDataObj represents the value of property passed through the object. 

function Article (rawDataObj) {
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
  // console.log('hi', articles);
  // TODO: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
}


Article.prototype.toHtml = function() {
  // COMMENT: What is the benefit of cloning the article? (see the jQuery docs)
  // The .clone() method performs an exact copy of the set of matched elements. It will copy the matched elements and their descendant elements and text nodes. It's a convenient way to duplicate elements on a page.

  let $newArticle = $('article.template').clone();
  $newArticle.removeClass('template')
    
  /* TODO: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);
  $('draft').add('author', 'authorUrl', 'title', 'body', 'publishedOn');
  $newArticle.find('h1').html(this.title);
  $newArticle.find('address').html(this.author);
  $newArticle.find('time').html(this.publishedOn);
  $newArticle.find('a').html(this.authorUrl);
  $newArticle.find('.article-body').html(this.body);

  /* TODO: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  // REVIEW: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000) + ' days ago');
  $newArticle.append('<hr>');
  return $newArticle;
};


rawData.sort(function(a,b) {
  // REVIEW: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

// TODO: Refactor these for loops using the .forEach() array method.

rawData.forEach(function(ele) {
  articles.push(new Article(ele));
})

articles.forEach(function(ele) {
  $('#articles').append(ele.toHtml());
})
