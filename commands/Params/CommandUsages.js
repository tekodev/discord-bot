module.exports = class CommandUsages {
    constructor() {
        return [
            {
                command: '?me',
                description: 'Sunucudaki Nickinizi Gösterir',
                example: '',
            },
            {
                command: '?lanteko',
                description: 'Tekoyu Çağırır',
                example: '',
            },
            {
                command: '?currency',
                description: 'Canlı Döviz Kurlarını Gösterir',
                example: '',
            },
            {
                command: '?shortlink',
                description: "Verdiğiniz Link'i Kısaltır",
                example: '?shortlink www.youtube.com',
            },
            {
                command: '?math',
                description: 'İşlem Yapar',
                example: '?math 10/2',
            },
            {
                command: '?play',
                description: 'İstediğiniz Şarkıyı Çalar',
                example: '?play (youtube araması) ya da (URL)',
            },
            {
                command: '?stop',
                description: 'Açtığınız Şarkıyı Durdurur ve Ses Kanalından Çıkar',
                example: '',
            },
        ];
    }
}