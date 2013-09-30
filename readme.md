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
<p>Document library GUID : {37C213FD-8F80-4DCC-86D1-268D776133B1}</p>


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

