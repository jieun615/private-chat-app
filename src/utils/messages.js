const getToken = () => {
    const key = [sender, receiver].sort().join("_");
    return key;
};

const saveMessages = async ({from, to, message, time}) => {
    const token = getToken(from, to);
    const data = {
        from, message, time
    };
    messageModel.updateOne({ userToken: token }, {
        $push: { messages: data }
    }, (err, res) => {
        if(err) console.error(err);
        console.log('메세지가 생성되었습니다.');
    });
};

module.exports = {
    saveMessages
};