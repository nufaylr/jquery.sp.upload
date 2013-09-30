Sharepoint Upload Form Loader
=============================

MS sharepoint document library upload form loader.

<p><strong>Simple usage example:</strong></p>

<pre><code>&lt;script src="js/jquery1.7.2.min.js"&gt;&lt;/script&gt;
&lt;script src="js/sp.upload.form.js"&gt;&lt;/script&gt;</code></pre>

<pre><code>$('#uploaderloder').SPLoadUploadForm({
    libraryId : '{37C213FD-8F80-4DCC-86D1-268D776133B1}'
});</code></pre>

<p><strong>Method :</strong></p>
<p>libraryId : Document library GUID</p>


<p><strong>Advance usage example:</strong></p>

<pre><code>$('#uploaderloder').SPLoadUploadForm({
    libraryId : '{37C213FD-8F80-4DCC-86D1-268D776133B1}',
    formComplete : function (i) {
     console.log('formcomplete', i);
    },
    uploadComplete : function (i) {
      console.log('uploadComplete', i);
    }
  });</code></pre>
  
<p><strong>Methods :</strong></p>
<p>formComplete : Once the form is loaded into the iframe <br/> uploadComplete : Once file is uploaded it will retrun file name,type..</p>
<p>strong>Some other method :</strong></p>
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
