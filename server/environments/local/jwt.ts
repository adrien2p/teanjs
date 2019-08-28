const localJwtConfig = {
    secretOrKey: 'jwtSecret',
    signOptions: { expiresIn: '60d' }
};

export default localJwtConfig;
