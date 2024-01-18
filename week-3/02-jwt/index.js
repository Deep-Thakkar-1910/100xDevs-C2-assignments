const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const z = require('zod');
const { options } = require('../01-middlewares/03-errorcount');
const usernameSchema  = z.string().email();
const passwordSchema = z.string().min(6);
const tokenSchema = z.string();
/**
 * Generates a JWT for a given username and password.
 *
 * @param {string} username - The username to be included in the JWT payload.
 *                            Must be a valid email address.
 * @param {string} password - The password to be included in the JWT payload.
 *                            Should meet the defined length requirement (e.g., 6 characters).
 * @returns {string|null} A JWT string if the username and password are valid.
 *                        Returns null if the username is not a valid email or
 *                        the password does not meet the length requirement.
 */
function signJwt(username, password) {
    const {success:validUsername} = usernameSchema.safeParse(username); 
    const {success:validPassword} = passwordSchema.safeParse(password); // Checks if username and password are valid.
    if(validUsername && validPassword) {
         const token = jwt.sign({username:username},jwtPassword); //sign jwt if username and password are valid
        return token;
    }else{
        return null;
    }
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
        try{
            const verfied = jwt.verify(token,jwtPassword) // doesn't verify for wrong jwt or password
            return verfied ? true : false; // returns the final output if jwt is verified or not

        }catch(err){
            if(err)return false;
        }

    }


/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    const decoded = jwt.decode(token); // decodes the jwt and returns true if the payload is obtained else false
        return decoded ? true : false;
}
module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};

