Sharepoint Upload Form Loader
=============================

MS sharepoint document library upload form loader using front end.

<p><strong>Simple usage example:</strong></p>

<p>Add Jquery and the plugin</p>
<pre><code>&lt;script src="js/jquery1.7.2.min.js"&gt;&lt;/script&gt;
&lt;script src="js/jquery.sp.upload.js"&gt;&lt;/script&gt;</code></pre>

<p>Body</p>
<pre><code>&lt;div id="UploadPlaceHolder"&gt; &lt;div&gt;</pre>

<p>In document ready</p>
<pre><code>$(function() {
    $('#UploadPlaceHolder').SPLoadUploadForm({
        libraryId : '{37C213FD-8F80-4DCC-86D1-268D776133B1}' //Document library GUID
    });
});</code></pre>

<p><strong>Advance usage example:</strong></p>

<p>Example 1 -  callback functions</p>
<pre><code>$('#UploadPlaceHolder').SPLoadUploadForm({
    libraryId : '{37C213FD-8F80-4DCC-86D1-268D776133B1}',
    formComplete : function (i) {
     console.log('formcomplete', i);
    },
    uploadComplete : function (i) {
      console.log('uploadComplete', i);
    }
  });</code></pre>


<p>Example 2</p>
<pre><code>$('#UploadPlaceHolder').SPLoadUploadForm({
    libraryId : '{37C213FD-8F80-4DCC-86D1-268D776133B1}',
    frameWidth : 450,
    frameHeight : 130,
    styleClass : 'formstyle',
    buttonColor : '#1ABC9C',
    formBackground : '#E3E3E3',
    overwrite : false,
    formComplete : function (i) {
     console.log('formcomplete', i);
    },
    uploadComplete : function (i) {
      console.log('uploadComplete', i);
    }
  });</code></pre>
===================================  
<p><strong>Properties :</strong></p>
<p>libraryId : Document library GUID - <a href="http://sarangasl.blogspot.co.uk/2009/12/sharepoint-list-guids-how-to-find.html">SharePoint List GUIDs, How to Find?</a></p>
<p>frameWidth ,frameHeight, styleClass, styleClass, buttonColor, formBackground, overwrite</p>

<p><strong>Callback functions :</strong></p>
<p>formComplete : Once the form is loaded into the iframe. 
<br/>uploadComplete : File uploaded function will return the status, file name,type..</p>

===================================
<p>Note : if the file is loading outside SharePoint frame using webdev then add your site path.
see the example :</p>
<pre><code>$(function() {
    $('#UploadPlaceHolder').SPLoadUploadForm({
        libraryId : '{37C213FD-8F80-4DCC-86D1-268D776133B1}',
        sitePath : '//domain.com/site/teamSiteNameHere'
    });
});</code></pre>
