### Using VITEJS

# URL [Site](http://103.57.221.122:3004/)

## Start Project

Start Frontend

```
npm run dev-f
```

Start Server

```
npm run dev-s
```

## Edit

bật terminal chạy các lệnh trước khi edit file:

```
git pull
```

## PUSH AUTODEPLOY

sau khi edit xong, chạy tuần tự các lệnh sau :

```
git add .
git commit -m "nội dung fix"
git push
```

## Project structure

```
public
server
    constant
        File.js     chứa path các file
            các function get<XXX>Files = () => {
                type === '1'    1 thành viên
                type === '2'    2 thành viên
                type === '3'    Cổ phần

                mỗi type đều sẽ có return [xxx,xxx,xxx,xxx]

                đầu tiên e phải khai báo path files, tên files, và key file theo dạng:
                keyFiles: {
                    name: tên files,
                    path: path files
                }

                tương ứng mỗi case em return về đúng files giúp anh

                ví dụ:

                const allFiles = {
                    xxx1: {
                        name: xxx,
                        path: xxx
                    },
                    xxx2: {
                        ...
                    }
                }


                return [ allFiles.xxx1 , allFiles.xxx2 ]
            }
            trong đó <XXX> là tên loại hình


src
    components
        Form
            CreateCompany: Form ve thanh lap doanh nghiep
                index.jsx
                ...
            ChangeInforForm: Form ve thay doi thông tin
                index.jsx
                ...
            PendingForm:    Form về tạm hoãn
                index.jsx   File chính
                ...
            Dissolution:    Form về giải thể
                index.jsx   File chính
                    GiaiThe
                        index.jsx
                        ...
                    HuyBoGiaiThe
            PreviewForm
        Admin
        User
        HOC         File này chia ra làm 2.
                        đoạn role === 'admin' => layout của admin.
                        return ở dưới là của user
    constant
        FormConstant.jsx    file chứa thông tin các label của preview form
uploads
    files
        change_info
        create_company
        dissolution
        pending
            các file docx mặc định là của 1tv và chung
            2tv
                file docx dành cho 2 tv
            cp
                file docx dành riêng cho cp

```

### PM2

```

# Start all applications

pm2 start ecosystem.config.js

# Stop all

pm2 stop ecosystem.config.js

# Restart all

pm2 restart ecosystem.config.js

# Reload all

pm2 reload ecosystem.config.js

# Delete all

pm2 delete ecosystem.config.js

```


### Note
```
https://github.com/hienvd/clean-code-javascript 


```