module.exports = mongoose => {
    const User = mongoose.model(
        'user',
        mongoose.Schema(
            {
                email: String,
                password: String,
                username: String
            }
        )
    );

    return User
}