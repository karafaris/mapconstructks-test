function doPost(e) {
    var folderId = 'YOUR_FOLDER_ID';
    var folder = DriveApp.getFolderById(folderId);
    var fileBlob = e.parameter.file;
    var file = folder.createFile(fileBlob);
    return ContentService.createTextOutput(JSON.stringify({'result': 'success'}));
  }
  
  function deploy() {
    var scriptProperties = PropertiesService.getScriptProperties();
    scriptProperties.setProperty('SCRIPT_ID', ScriptApp.getService().getScriptId());
    var url = ScriptApp.getService().getUrl();
    Logger.log('Deployed as web app with URL: ' + url);
  }