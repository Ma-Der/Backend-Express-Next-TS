import * as openpgp from 'openpgp';
import { passphrase } from '../Config/envVariables';

export class CryptoService {

    private publicKeyArmored = `------BEGIN PGP PUBLIC KEY BLOCK-----
    sdadasdasdsadsdsdsadsadsdsdsadasdasdsda342325efdsdsad*&&%$%DRShjdsdsdas
    -----END PGP PUBLIC KEY BLOCK-----`;

    private privateKeyArmored = `------BEGIN PGP PUBLIC KEY BLOCK-----
    lkljjashfjjdlskld;kld:KSDjlkjNJKsdl;kdklksdkjI((F*f8dhsjdknkmnksk))
    -----END PGP PUBLIC KEY BLOCK-----`;

    private async createPublicKey() {
        const publicKey = await openpgp.readKey({ armoredKey: this.publicKeyArmored });
        return publicKey;
    }

    private async createPrivateKey() {
        const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: this.privateKeyArmored }),
            passphrase
        });
        return privateKey;
    }

    private async generateKeys() {
        const publicKey = await this.createPublicKey();
        const privateKey = await this.createPrivateKey();
        return { publicKey, privateKey };
    }

    private async encryptText(publicKey: openpgp.Key, text: string) {
        return await openpgp.encrypt({
            message: await openpgp.createMessage({ text }),
            encryptionKeys: publicKey
        });
    }

    public async encryptEmail(dataToEncrypt: string) {
        const { publicKey } = await this.generateKeys();

        const encryptedText = await this.encryptText(publicKey, dataToEncrypt);

        return encryptedText;
    }

    public async decryptEmail(dataToDecrypt: string) {
        try {
            const message = await openpgp.readMessage({ armoredMessage: dataToDecrypt });
            const { privateKey } = await this.generateKeys();
            const { data: decrypted } = await openpgp.decrypt({
                message,
                decryptionKeys: privateKey
            });
    
            return decrypted;
        }
        catch(err) {
            throw Error('Something went wrong with decryption !');
        }
    }
}