
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface testFiles {}

interface Config {
    [key: string]: testFiles | string;
}

const config: Config = {
    sampleFile: join(
        __dirname,
        "../attachments/sampleFile.pdf",
    )
};

export default config as {
    sampleFile: string;
};
