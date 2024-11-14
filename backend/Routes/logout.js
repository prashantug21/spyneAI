async function logout(req,res){
   
    res.clearCookie('authToken');
    return res.status(200).json({ message: 'Logged out'});
}

module.exports=logout;