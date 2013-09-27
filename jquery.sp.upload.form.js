/*! MS Sharepoint Upload Form Loader  - v0.1 - 2013-09-26
* Original author : @nufaylr
* Licensed under the MIT license
*/

;(function($) {

  $.fn.SPLoadUploadForm = function( options ) {

    // Defualt settings 
    var settings = $.extend({
        libraryId : null,
        sitePath : '//'+window.location.host+_spPageContextInfo.webServerRelativeUrl,
        frameWidth : 450,
        frameHeight : 130,
        styleClass : 'formstyle',
        loadingGif : 'loading.gif',
        buttonColor : '#CE473D',
        formBackground : '#FFF',
        overwrite : false,
        formComplete  : null,
        uploadComplete : null
    },  options);


    // Plugin messages
    var _messages = {
        done : 'success',
        error : 'error',
        uploadDone : 'success',
        uploadError : 'error',
        settingsError : 'Please check the API document. Missing some settings'
    };


    // Sharepoint document library supporting file formats ** Add if necessary.
    var _fileTypes = {
        'bmp': 'bmp',
        'gif': 'gif',
        'jpg': 'jpg',
        'jpeg': 'jpeg',
        'jpe': 'jpe',
        'png': 'png',
        'psd': 'psd',
        'tga': 'tga',
        'tif': 'tif',
        'thm': 'thm',
        'tiff': 'tiff',
        'yuv': 'yuv',
        'doc' : 'doc',
        'docx' : 'docx',
        'pdf' : 'pdf',
        'txt' : 'txt'
    };


    // File meta data object to return 
    var _uploadMetaData = {
        status : undefined,
        fileName : undefined,
        fileType : undefined,
        image : {
                width : 0,
                height : 0
        } 
    };

    // Rewrighting CSS
    var _browserPaddingFix_B = '0px';
    var _browserPaddingFix_T = '0px';

    if ( ! $.browser.msie ) {
      _browserPaddingFix_B = '0.4em';
      _browserPaddingFix_T = '0.1em';
    }

    var _css = '<style type="text/css">'
               +'.ms-descriptiontext{background : '+settings.formBackground+';}'
               +'#MSO_ContentTable{background : '+settings.formBackground+';}'
               +'#ctl00_PlaceHolderMain_UploadDocumentSection .ms-authoringcontrols{background : '+settings.formBackground+';}'
               +'.ms-sectionline{height : 1px;}'
               +'#ctl00_PlaceHolderMain_ctl03_RptControls_btnOK{'
               +  'background : '+settings.buttonColor+';'
               +  'border : solid 1px #eee;'
               +  'color : #fff;'
               +  'font-size : 13px;'
               +  'width : 100px;'
               +  'height : 26px;'
               +  'padding : 0px;'
               +  'padding-bottom : '+_browserPaddingFix_B+';'
               +  'padding-top : '+_browserPaddingFix_T+';'
               +  'margin : 0px 0px 0px 20px;'
               +'}'
               +'body{background-color : '+settings.formBackground+';}'
               +'.frameInsideMessage{padding-top : 25px;}'
               +'</style>';


    // This
    var _uploadFrom = this;
    var _iframeId = 'iframe_'+_uploadFrom.attr('id');



    if( settings.libraryId != null ){
      

      if ( $.browser.msie ) {
        var _ieWidthFix = settings.frameWidth + 0;
        settings.frameWidth = _ieWidthFix;
      }


      return _uploadFrom.each( function() {

        var _formPath = ''+settings.sitePath+'/_layouts/Upload.aspx?List='+settings.libraryId+'&RootFolder=&IsDlg=1';

        var _iframe = $( '<iframe />' ).attr({
          width : settings.frameWidth+'px',
          height : settings.frameHeight+'px',
          scrolling : 'no',
          frameborder : '0',
          src : _formPath,
          id : _iframeId
        });

        var _formWrapper = $( '<div />' ).css({
          'width' : settings.frameWidth+'px',
          'height' : settings.frameHeight+'px',
          'position' : 'relative',
          'overflow' : 'hidden'
        });

        _formWrapper.attr({
          'class': settings.styleClass
        });

        var _formInner = $( '<div />' );

        var _hiddenDestination = $('<input />').attr({
           'type' : 'hidden',
           'id'   : 'hiddenDestination'
        });

        var _hiddenFileName = $('<input />').attr({
           'type' : 'hidden',
           'id'   : 'hiddenFileName'
        });

        var _hiddenFormLoop = $('<input />').attr({
           'type' : 'hidden',
           'id'   : 'hiddenFormCount',
           'value' : 1
        });

        var _domMessage = $('<h3 />').addClass('frameInsideMessage');
        var _domMessageDescription = $('<p />').addClass('frameInsideDescription');

        _formInner.append( _iframe );
        _formWrapper.append( _formInner );
        _uploadFrom.append( _formWrapper );
        _uploadFrom.append( _hiddenFormLoop );

        var _reloadStatus = 0;
        var _destination = 'blank';
        var _specialCharactorError = false;


        /* iframe loading */
        _iframe.load(function(){

            var _iframeWorkspaceID = _iframe.contents();
           _iframeWorkspaceID.find('head').append(_css);        

           // Checking for iframe load count
            if( _hiddenFormLoop.val() == 1 ){
              _specialCharactorError = true;
            } else {
              _reloadStatus = 1;
            }

            if( _iframeWorkspaceID.find( '#errorPageTitleSpan' ).text() != 'Error' && _specialCharactorError != false ) {
          
                _iframeWorkspaceID.find( '#s4-workspace' ).attr('style', ' ');
                _iframeWorkspaceID.find( '#s4-workspace' ).css({
                  'overflow-y' : 'auto'
                });

                _iframeWorkspaceID.find( '#ctl00_PlaceHolderMain_ctl03_RptControls_btnOK' ).val('Upload');

                _iframeWorkspaceID.find( '#ctl00_PlaceHolderMain_UploadDocumentSection td' ).eq(0).remove();
                _iframeWorkspaceID.find( '#ctl00_PlaceHolderMain_ctl03_BtnCancel' ).remove();           
                _iframeWorkspaceID.find( '#ctl00_PlaceHolderMain_UploadDocumentSection_ctl03_LiteralLabelText' ).remove();
                _iframeWorkspaceID.find( '#ctl00_PlaceHolderMain_UploadDocumentSection_ctl03_UploadMultipleLink' ).remove();
                _iframeWorkspaceID.find( '#ctl00_PlaceHolderMain_UploadDocumentSection_tablerow1' ).remove();
                _iframeWorkspaceID.find( '#ctl00_PlaceHolderMain_UploadDocumentSection_ctl03_tablerow5' ).remove();
                _iframeWorkspaceID.find( '#ctl00_PlaceHolderMain_ctl03_RptControls_btnOK' ).parent().prev().remove();

                if(settings.overwrite == false){
                  _iframeWorkspaceID.find( '#ctl00_PlaceHolderMain_UploadDocumentSection_ctl03_OverwriteSingle' ).next().remove();
                  _iframeWorkspaceID.find( '#ctl00_PlaceHolderMain_UploadDocumentSection_ctl03_OverwriteSingle' ).remove();            
                }

                if(_reloadStatus == 0){
                  if ( $.isFunction( settings.formComplete ) ) {
                    settings.formComplete.call( _formInner,_messages.done );
                  }
                }

                _destination = _iframeWorkspaceID.find( '#destination' ).val();              
                

                // Upload form button click event
                _iframeWorkspaceID.find('#ctl00_PlaceHolderMain_ctl03_RptControls_btnOK').on("click",function (){                  
                  _hiddenDestination.attr('value',_destination);               
                  _hiddenFileName.attr('value',_iframeWorkspaceID.find("#ctl00_PlaceHolderMain_UploadDocumentSection_ctl03_InputFile").val());                  
                  $('#hiddenFormCount').val('0');
                  _uploadFrom.append( _hiddenDestination );
                  _uploadFrom.append( _hiddenFileName );
                });


                // After upload form button clicked.
                // iframe reloads. 
                if(_reloadStatus == 1){
                  UploadControler($('#hiddenDestination').val(),$('#hiddenFileName').val());                                                   
                }
              

            } else {

              /* If form isn't loading or image is exisiting */
              var _getMessage = _iframeWorkspaceID.find('#ctl00_PlaceHolderMain_LabelMessage').text();
              _iframeWorkspaceID.find( 'body' ).empty();

              _domMessage.text('Upload Error');
              _domMessageDescription.text(_getMessage);
              _iframeWorkspaceID.find( 'body' ).append(_domMessage);
              _iframeWorkspaceID.find( 'body' ).append(_domMessageDescription);

              if(_reloadStatus == 0){
                if ( $.isFunction( settings.formComplete ) ) {
                    settings.formComplete.call( _formInner,_messages.error );
                }
              }

              if(_reloadStatus == 1){
                  if ( $.isFunction( settings.uploadComplete ) ) {
                    settings.uploadComplete.call( _formInner,_messages.uploadError );
                  }

                  var _reloadLink = $('<a />').attr({
                    id : 'reloadFrame',
                    href : '#'
                  }).click(function() {
                    // Resetting the form hidden value into 0
                    _reloadStatus = 0;
                    _specialCharactorError = false;
                    $('#hiddenFormCount').val('1');
                    
                    $('#'+_iframeId+'').attr('src', _formPath);                    
                  });

                  _reloadLink.text('Upload different file.');
                  _iframeWorkspaceID.find( 'body' ).append(_reloadLink);

              }

            }


        });



        // UploadControler function runs on onlcik form button
        function UploadControler (destination,file) {

            if(destination != undefined && file != undefined){
                var _imgFileType = file.split('.')[1].toLowerCase();
                var _destinationPath = '//'+window.location.host+''+destination+'/'+file+'';          
              
                var _iframeSuccess = _iframe.contents();
                    _iframeSuccess.find('body').attr('onload',' ');
                    _iframeSuccess.find( 'body' ).empty();
                    
                _uploadMetaData.fileName = file;
                _uploadMetaData.fileType = _imgFileType;
                
                if( _fileTypes[_imgFileType] === _imgFileType )  {

                  var _imageLoadContainer = $( '<img />' ).attr({ 
                      id : 'tempFileLoader',
                      src : _destinationPath
                  });

                  _imageLoadContainer.css({
                     'display' : 'none'
                  });

                  _uploadFrom.append(_imageLoadContainer);

                  $( "#tempFileLoader" ).load(function() {
                      _uploadMetaData.image.width = $( this ).width();
                      _uploadMetaData.image.height = $( this ).height();
                  });

                } else {

                    var _fileLoadContainer = $( '<div />' ).attr({ 
                        id : 'tempFileLoader'
                    });

                    _fileLoadContainer.css({
                      'display' : 'none'
                    });

                    var _intervalID = setInterval(function(){
                        _fileLoadContainer.load(_destinationPath,function(i,s,x) {
                            //console.log(s);
                            if(s === 'success'){
                              clearInterval(_intervalID);
                            }
                        });
                    }, 3000);

                }

                _domMessage.text('Successfully Uploaded.');
                _iframeSuccess.find( 'body' ).append(_domMessage);

                if ( $.isFunction( settings.uploadComplete ) ) {
                    _uploadMetaData.status = _messages.uploadDone;
                    settings.uploadComplete.call( _formInner,_uploadMetaData );
                }
            }

        }

      });

    } else {

      return _uploadFrom.each( function() {
        _uploadFrom.append( _messages.settingsError );
      });

    }

  };

}(jQuery));