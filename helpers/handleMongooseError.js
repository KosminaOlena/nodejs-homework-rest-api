const handleMongooseError = (error, data, next) => {
    console.log(error);
    next();
};

module.exports = handleMongooseError;