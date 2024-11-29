import QRCode from 'qrcode';
import React, { useEffect, useRef, useState } from 'react';
import Pix from '../../Utils/pix';
import './style.css';

function Ajude() {
    const qrCodeRef = useRef(null);
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [pixKey, setPixKey] = useState('47991518118');
    const [amount, setAmount] = useState(1.00);

    useEffect(() => {
        const pix = new Pix(
            pixKey, // Chave Pix
            'Pagamento de teste', // Descrição
            'Eduardo Hansen', // Nome do beneficiário
            'Joinville', // Cidade do beneficiário
            '1234567890', // TXID
            amount // Valor
        );

        const pixPayload = pix.getPayload();
        setQrCodeValue(pixPayload);

        if (qrCodeRef.current) {
            QRCode.toDataURL(pixPayload, {
                color: {
                    dark: '#000',  // Cor do QR Code
                    light: '#FFF'  // Cor de fundo
                }
            })
            .then((url) => {
                const img = document.createElement('img');
                img.src = url;
                qrCodeRef.current.appendChild(img);
            })
            .catch((err) => console.error(err));
        }
    }, [pixKey, amount]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(qrCodeValue).then(() => {
            alert('QR Code copiado para a área de transferência.');
        }).catch(err => {
            console.error('Erro ao copiar o QR Code: ', err);
        });
    };

    return (
        <div className='main'>
            <div ref={qrCodeRef} className="qr-code-container"></div>
            <p>Valor: {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(amount)}</p>
            <button onClick={copyToClipboard}>Copiar QR Code</button>
        </div>
    );
}

export default Ajude;
