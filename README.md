Cách tạo và sửa lỗi khi build Electron
Link youtube tham khảo: https://www.youtube.com/watch?v=oAaS9ix8pes
Phần 1: Chuyển đổi từ ReactJs sang Electron.
1. Chạy lệnh để khởi tạo ReactJs typescript: 
    - npx create-react-app my-app --template typescript
    - cd my-app

2. Trong file package.json ở mục "scripts" ta thêm các phần tử sau:
    "scripts": {
        ...,
        "electron:serve": "concurrently -k \"cross-env BROWSER=none yarn start\" \"yarn electron:start\"",
        "electron:build": "",
        "electron:start": "wait-on tcp:3000 && electron ."
    },
    <-- Chỗ electron:build chưa điền vội, bao giờ build thành file .exe thì điền sau -->

3. Trong file package.json ta thêm các phần tử:
    "main": "public/main.js",
    "homepage": "./",
    <-- Thường để đứng sau mục "dependencies" và đứng trước mục "scripts" -->

4. Trong thư mục "public/" thêm file main.js. 
Sau đó vào đường link của electron: https://github.com/electron/electron-quick-start. 
Copy file main.js ở link đó dán vào file main.js vừa tạo.
    - Trong file main.js đổi:
        + biến const mainWindow thành const win (có thể không đổi cũng được)
        + win.loadFile('index.html') -> win.loadURL('http://localhost:3000')

5. Chạy lệnh: yarn add @electron/remote.

6.  - Trong file main.js thêm 
        require('@electron/remote/main').initialize() 
      sau dòng lệnh 
        const {app, BrowserWindow} = require('electron')
    - Vẫn trong file main.js sửa:
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
         enableRemoteModule: true
        }
    })

7. Chạy lệnh: yarn electron:serve để chuyển từ reactjs sang electron.

*** Có các lỗi sau ***
[1] error Command failed with exit code 1.
[1] yarn electron:start exited with code 1
--> Sending SIGTERM to other processes..
[0] cross-env BROWSER=none yarn start exited with code 1

*** Cách khắc phục *** 
1. Chạy lệnh: npm install --save cross-env
2. Chạy lại lệnh: yarn electron:serve

--> Ta thấy còn lỗi sau:
[1] yarn electron:start exited with code 1
--> Sending SIGTERM to other processes..
[0] cross-env BROWSER=none yarn start exited with code 1
error Command failed with exit code 1.

... 
1. Ta tạo file .env tại thư mục my-app.
2. Ta thêm "BROWSER=none" vào trong mục .env (không có dấu "").
3. Chạy lệnh: yarn install
4. Chạy lệnh: yarn add electron
5. Chạy lại lệnh: yarn electron:serve
...
ĐÃ BUILD THÀNH CÔNG

Phần 2: Build thành file .exe

1. Chạy lệnh: yarn add electron-builder electron-is-dev
2. Sửa file main.js chỗ:
    const {app, BrowserWindow} = require('electron')
    const path = require('path')
    const isDev = require('electron-is-dev')

    require('@electron/remote/main').initialize()
    // const path = require('path')

    function createWindow () {
      // Create the browser window.
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
            }
        })

        // and load the index.html of the app.
        win.loadURL(
            isDev
                ? 'http://localhost:3000'
                : `file://${path.join(__dirname, '../build/index.html')}`
        )

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    }
3. Trong file package.json thêm:
//
    "build": {
        "extends": null,
        "appId": "com.example.electron-cra",
        "files": [
            "dist/**/*",
            "build/**/*",
            "node_modules/**/*",
            "package.json"
        ],
        "directories": {
            "buildResources": "assets"
        }
    },

- Và cùng đó sữa lại "electron:build": "" thành "electron:build": "yarn build && electron-builder -c.extraMetadata.main=build/main.js",
(ở trong file package.json)

4. Chạy lệnh: yarn electron:build để build app.
*** Lỗi xảy ra ***
Package "electron" is only allowed in "devDependencies". Please remove it from the "dependencies" section in your package.json.
Package "electron-builder" is only allowed in "devDependencies". Please remove it from the "dependencies" section in your package.json.
error Command failed with exit code 1.
---------------------------------------------
FIXXX BUG
------------------------
1. Chạy lệnh: npm prune --production
2. Chạy lại lệnh yarn electron:build
---> Lỗi: 'react-scripts' is not recognized as an internal or external command, operable program or batch file.
3. Chạy lệnh: npm install react-scripts --save
4. Chạy lại lệnh yarn electron:build
---> Lỗi: 'electron-builder' is not recognized as an internal or external command, operable program or batch file.
5. Chạy lệnh: npm i electron-builder
---> Lại về lỗi cũ:
Package "electron" is only allowed in "devDependencies". Please remove it from the "dependencies" section in your package.json.
Package "electron-builder" is only allowed in "devDependencies". Please remove it from the "dependencies" section in your package.json.
error Command failed with exit code 1.
6. Chạy lệnh: yarn add electron-builder --dev
7. Chạy lại lệnh yarn electron:build
---> Vẫn bị lỗi như trên...
8. Xóa 2 thuộc tính     
    "electron": "^15.3.0",
    "electron-builder": "^22.13.1",
    trong mục "dependencies"
9. Chạy lại lệnh yarn electron:build
-----------------------------
XONG !!!
BIẾT THẾ XÓA TỪ BƯỚC 1 !

Phần 3: Các vấn đề chuyển từ ReactJS sang Electron.
1. 
    - Nếu file App.tsx chỉ viết router thì Reactjs và bản build Electronjs vẫn ổn. Nhưng build ra file .exe vì nó lấy mặc định màn hình chính là App.tsx, nên là khi build ra .exe thì app ko hiện gì cả.

    - Cách sửa lỗi: --> Đổi BrowserRouter thành HashRouter.

2. 
    - Các file icon .svg không hiện thị được trong Electron.
    - Cách sửa lỗi: --> Thêm code này vào function createWindow của file main.js:
        win.webContents.on('dom-ready', () => {
            fs.readFile(path.join(__dirname, 'logo192.png'), 'utf8', (err, data) => {
                if (err) throw err
                    win.webContents.executeJavaScript(`
                        var doc = new DOMParser().parseFromString(
                            '${data}',
                            'application/xml')
                        var svgHolder = document.getElementById('svgtest') // is just a <div>
                    svgHolder.appendChild(svgHolder.ownerDocument.importNode(doc.documentElement, true))
                `)
            })
        })
    
