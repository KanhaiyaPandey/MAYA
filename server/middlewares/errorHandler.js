const errorHandler = (err, req, res, next) => {
    console.log(err);
    res.status(500).json({msg: `something went wrong`})
}

export default errorHandler;