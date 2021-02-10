const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
var dotenv = require('dotenv');
dotenv.config();

const { User } = require("./models/User");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_URL);
var db = mongoose.connection;
db.once('open', function(){
    console.log('DB connected');
});
db.on('error', function(err){
    console.log('DB ERROR : ', err);
});


app.get('/', (req, res) => res.send('Hello World!~~안녕하세요 ~ '));

app.post('/register', (req, res) => {
    //회원 가입 할떄 필요한 정보들을  client에서 가져오면 
    //그것들을  데이터 베이스에 넣어준다. 
    const user = new User(req.body);

    user.save((err, userInfo) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).json({
            success: true
        });
    });
});

app.post('/login', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            });
        };
        //요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인.
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })
            //비밀번호 까지 맞다면 토큰을 생성하기.
            user.generateToken((err, user) => {
            });
        });
    });
});

const port = 3000;
app.listen(port, () => console.log(`server on! http://localhost:${port}`)) 