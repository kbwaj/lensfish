async function createUserFirebase(admin, name, email, uid, address, privateKey, mnemonic){
   await admin.firestore().collection('users').doc(uid).set({
        name, 
        email, 
        address, 
        privateKey, 
        mnemonic:mnemonic.replaceAll("+", " ")
    })

    return true;
}

module.exports = {
    createUserFirebase
}