# Mundos Photos Website
Built and maintained by Jose Cadenas

### Update Photos 
Page on the website (e.g. photography or photoBooth)
1. Open finder (cmd+n)
2. Navigate to "Documents/GitHub/website/public/photos/{page}"
3. Add or remove photos
4. Select all photos in folder (cmd+a) > Right click files > Click rename
5. Match settings ![Rename type: Format, Name Format: Name and Index, Where: after name, Custom Format: photo, Start numbers at: 1]("photos/misc/readMeRenameFormat")
6. Click rename 
7. Remember last/largest photo number
8. Open Visual Studio Code with "Documents/GitHub/website"
9. Open "src/pages/{page}"
10. Find (cmd+f) ```numberOfPhotos``` and update number
11. Save file > Build > Deploy to go live
---

### Start Development Mode (hot-code reloading, error reporting, etc.)
```npm run dev```

### Stop Development Mode
Click on terminal in VSCode
Click ```ctr+c```

### Build
```npm run build```

## Deploy
```npm run deploy```