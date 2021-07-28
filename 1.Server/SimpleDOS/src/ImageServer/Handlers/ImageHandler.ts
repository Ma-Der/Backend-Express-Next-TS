import path from 'path';

export class ImageHandler {
    public static getFirstImage() {
        const image1Path = path.join(path.resolve() + '/src' + '/ImageServer' + '/Public' + '/dog1.jpg');
        return image1Path;
    }

    public static getSecondImage() {
        const image1Path = path.join(path.resolve() + '/src' + '/ImageServer' + '/Public' + '/dog2.jpg');
        return image1Path;
    }
}