Sharepoint Upload Form Loader
=============================

MS sharepoint document library upload form loader using front end.

<p><strong>Simple usage example:</strong></p>

<p>Add Jquery and the plugin</p>
<pre><code>&lt;script src="js/jquery1.7.2.min.js"&gt;&lt;/script&gt;
&lt;script src="js/jquery.sp.upload.js"&gt;&lt;/script&gt;</code></pre>

<p>Body</p>
<pre><code>&lt;div id="uploaderloder"&gt;&lt;div&gt;</pre>

<p>In Document ready</p>
<pre><code>$(function() {
    $('#uploaderloder').SPLoadUploadForm({
        libraryId : '{37C213FD-8F80-4DCC-86D1-268D776133B1}'
    });
});</code></pre>

<p><strong>Advance usage example:</strong></p>

<p>Example 1</p>
<pre><code>$('#uploaderloder').SPLoadUploadForm({
    libraryId : '{37C213FD-8F80-4DCC-86D1-268D776133B1}',
    formComplete : function (i) {
     console.log('formcomplete', i);
    },
    uploadComplete : function (i) {
      console.log('uploadComplete', i);
    }
  });</code></pre>


<p>Example 2</p>
<pre><code>$('#uploaderloder').SPLoadUploadForm({
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
  
<p><strong>Methods :</strong></p>
<p>libraryId : Document library GUID</p>
<p><strong>Callback functions :</strong></p>
<p>formComplete : Once the form is loaded into the iframe. 
<br/>uploadComplete : File uploaded function will return the status, file name,type..</p>

Note : if the file is loading outside SharePoint using webdev then add your site path. see the example :

<pre><code>$(function() {
    $('#uploaderloder').SPLoadUploadForm({
        libraryId : '{37C213FD-8F80-4DCC-86D1-268D776133B1}',
        sitePath : '/site/teamSiteNameHere'
    });
});</code></pre>
