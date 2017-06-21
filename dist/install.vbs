Option Explicit

' Parameters for the OpenTextFile function'
Const ForReading = 1
Const ForWriting = 2

Function getFileContents(filePath)
  Dim fso
    Set fso = CreateObject("Scripting.FileSystemObject")

  Dim file
    Set file = fso.OpenTextFile(filePath, ForReading)

  getFileContents = file.ReadAll
End Function

Sub createNewFile(fileName, fileContents)
  Dim fso
    Set fso = CreateObject("Scripting.FileSystemObject")

  wscript.echo fileName

  Dim file
    Set file = fso.CreateTextFile(fileName, True)

  file.Write fileContents
End Sub

Sub CreateBookmarksBackup(folderPath)
  Dim fso
    Set fso = CreateObject("Scripting.FileSystemObject")

  Dim backupData
    backupData = getFileContents(fso.BuildPath(folderPath, "Bookmarks"))

  Dim sysTime
    sysTime = " " & FormatDateTime(Date, vbShortDate)
    sysTime = sysTime & " " & FormatDateTime(Now, vbLongTime)

  Dim fileName
    fileName = "Bookmarks Backup " & sysTime

  Dim filePath
    filePath = fso.BuildPath(folderPath, fileName)

  createNewFile filePath, backupData
End Sub

Sub main()

  Dim fso ' file system object
    Set fso = CreateObject("Scripting.FileSystemObject")

  Dim userName
    userName = CreateObject("WScript.Network").UserName
  Dim folderPath
    folderPath = "C:\Users\" & userName &_
                 "\AppData\Local\Google\Chrome\User Data\Default"
  Dim fileName
    fileName = "Bookmarks"
  Dim fullPath
    fullPath = fso.BuildPath(folderPath, fileName)

  Dim openFile
  Dim writeFile
    ' Make sure the user has a Bookmarks file in the correct directory
    If fso.FileExists(fullPath) Then
      Set openFile = fso.OpenTextFile(fullPath, ForReading)
    Else
      Wscript.Echo "There appears to be a problem with your Chrome " &_
                   "installation! Installation has failed; please "  &_
                   "consult with Jordin or Mitchell."
      Exit Sub
    End If

  ' Make sure the appropriate JS file can be found'
  Dim code
    If fso.FileExists("obfuscated.js") Then
      code = getFileContents("obfuscated.js")
    Else
      Wscript.Echo "Could not find the file 'obfuscated.js'. Are you" &_
                   " running this installation in the correct folder?" &_
                   " Exiting installation."
      Exit Sub
    End If

  Dim link
    link = "http://ccm.net/faq/31791-how-to-back-up-your-google-chrome-bookmarks"

  Dim help
    help = _
    MsgBox ("This installer will edit the bookmarks file that Google Chrome" &_
            " reads from. If you care about your Chrome bookmarks, " &_
            " it is highly recommended that you back them up before " &_
            " continuing with this installer." & vbCrLf & vbCrLf &_
            " Would you like help backing up your bookmarks?", _
            vbYesNo, "Backup Bookmarks")

  Dim continue
  If help = vbYes Then
    continue = MsgBox ("To back up Google Chrome bookmarks: " & vbCrLf & vbCrLf &_
            "1. Open Google Chrome" & vbCrLf &_
            "2. Press Ctrl+Shift+O on your keyboard." & vbCrLf &_
            "3. Near the top of the screen, click on ""Organise""" & vbCrLf &_
            "4. At the bottom of the dropdown list, click on ""Export bookmarks to HTML file""" & vbCrLf &_
            "5. Select a file location to store your bookmarks at" & vbCrLf & vbCrLf &_
            "Note: to restore your bookmarks, the process is the same, " &_
            "but instead click on ""Import bookmarks from HTML file"" in the dropdown menu" & vbCrLf & vbCrLf &_
            "Continue with installation?", vbYesNo, "Backup Bookmarks")

      If continue = vbNo Then
        Wscript.Echo "Installation canceled."
        Exit Sub
      End If
  Else
    continue = MsgBox("Continue with installation?", vbYesNo, "Continue")

    If continue = vbNo Then
      Exit Sub
    End If
  End If

  Dim newBookmarkTitle 
    newBookmarkTitle = "QA Helper BETA"
  Dim newBookmarkValue
    newBookmarkValue = code
  Dim newBookmark    
    newBookmark = "{""date_added"": ""13141508080232986"",""id"": ""12"",""name"": """&newBookmarkTitle&_
    """,""type"": ""url"",""url"": """&newBookmarkValue&"""}"

  Dim fileLine
  Dim fileContents ' Data from file will be pushed here
  Dim insideBookmarkBarArray

  While Not openFile.AtEndOfStream
    fileLine = openFile.readLine

    ' Set flag once we know that we're inside the BookmarkBar object
    If InStr(fileLine, "bookmark_bar") Then
      insideBookmarkBarArray = True
    End If

    ' Handle if the QA Helper is already installed'
    If insideBookmarkBarArray And InStr(fileLine, "QA Helper") Then
      Dim installAnyway
      installAnyway = _
      MsgBox ("It looks like the QA Helper is already installed,"        &_
              " or you already have another bookmark named 'QA Helper'." &_
              " If you try to install it again, there's a possibility"   &_
              " that it could create issues with your Chrome bookmarks." &_
              " Would you like to install anyway?", _
              vbYesNo, "Prior Installation Detected")

      If installAnyway = vbNo Then
        Wscript.Echo "Installation canceled. Try removing/renaming the" &_
                     " bookmark from Chrome first, and then re-running" &_
                     " the installation."
        Exit Sub
      End If
    End If

    ' If we found the end of the bookmark array, add the QA Helper
    If insideBookmarkBarArray And InStr(fileLine, "]") Then
      insideBookmarkBarArray = False

      ' Add all characters on the line to the fileContents string, except
      ' for the closing bracket
      Dim i 

      For i=1 To Len(fileLine)
        Dim character ' current letter
        character = Mid(fileLine, i, 1)

        Dim match ' current letter == "]" ?
        match = StrComp("]", character)

        If match = 0 Then
          Exit For
        Else
          fileContents = fileContents & character
        End If
      Next

      ' Add the new Bookmark and close the array
      fileContents = fileContents & ","
      fileContents = fileContents & newBookmark
      fileContents = fileContents & "],"
    Else
      fileContents = fileContents & fileLine
    End If
  Wend

  openFile.Close

  ' Overwrite the old Bookmarks file with the new data
  Set writeFile = fso.CreateTextFile(fullPath, True)
  writeFile.Write fileContents
  writeFile.Close

  wscript.echo "The QA Helper has been installed! Please restart "          &_
               "Google Chrome. If after doing so your bookmarks are no"     &_
               " longer appearing, please run the file called 'restore' in" &_
               " this folder and consult Jordin or Mitchell."
End Sub


main


