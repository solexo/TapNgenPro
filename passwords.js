// Password management system for TapNgen
// This file handles saving and retrieving passwords using browser localStorage

// Encryption key (obfuscated and will be loaded from .env if available)
const _0x4f23=['54','61','70','4e','67','65','6e','53','65','63','72','65','74','4b','65','79','32','30','32','35'];
let encryptionKey = (function(){
    let _0x2a7d = '';
    for(let i = 0; i < _0x4f23.length; i++) {
        _0x2a7d += String.fromCharCode(parseInt(_0x4f23[i], 16));
    }
    return _0x2a7d;
})();

// Storage key (obfuscated)
const _0x1e4f = ['reverse','74','61','70','6e','67','65','6e','5f','70','61','73','73','77','6f','72','64','73'];
const storageKey = (function(){
    let _0x3a2d = '';
    for(let i = 1; i < _0x1e4f.length; i++) {
        _0x3a2d += String.fromCharCode(parseInt(_0x1e4f[i], 16));
    }
    return _0x3a2d;
})();

// Function to load encryption key from .env file
async function loadEncryptionKey() {
    try {
        const response = await fetch('.env');
        if (response.ok) {
            const text = await response.text();
            // Parse .env file to extract ENCRYPTION_KEY
            const encryptionKeyMatch = text.match(/ENCRYPTION_KEY=(.+)/);
            if (encryptionKeyMatch && encryptionKeyMatch[1]) {
                encryptionKey = encryptionKeyMatch[1].trim();
                // Obfuscate console output
                (function(){console.log("Configuration loaded successfully");})();
            }
        }
    } catch (error) {
        // Silent error handling for security
    }
}

// Load encryption key on script initialization
loadEncryptionKey();

// Function to encrypt data (obfuscated)
const _0x2c8d=['length','charCodeAt','fromCharCode'];
(function(_0x2a7d,_0x2c8d){const _0x4f23=function(_0x5a71){while(--_0x5a71){_0x2a7d['push'](_0x2a7d['shift']());}};_0x4f23(++_0x2c8d);}(_0x2c8d,0x1f4));

// Fonction de chiffrement améliorée
function encryptData(data) {
    try {
        // Utiliser une clé de chiffrement fixe pour la compatibilité
        const key = 'TapNgenSecretKey2025';
        let result = '';
        for (let i = 0; i < data.length; i++) {
            const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }
        return btoa(result); // Encodage en base64
    } catch (error) {
        throw new Error('Erreur de chiffrement');
    }
}

// Fonction de déchiffrement améliorée
function decryptData(encryptedData) {
    try {
        // Utiliser la même clé de chiffrement
        const key = 'TapNgenSecretKey2025';
        const data = atob(encryptedData); // Décodage base64
        let result = '';
        for (let i = 0; i < data.length; i++) {
            const charCode = data.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }
        return result;
    } catch (error) {
        throw new Error('Erreur de déchiffrement');
    }
}

// Password Manager Module
const passwordManager = {
    // Storage key for passwords
    storageKey: 'tapngen_passwords',
    
    // Function to check if a password is valid
    checkPassword: function(password) {
        try {
            const passwords = this.getPasswords();
            if (passwords.includes(password)) {
                return {
                    success: true,
                    message: "Mot de passe correct"
                };
            }
            return {
                success: false,
                message: "Mot de passe incorrect"
            };
        } catch (error) {
            console.error("Erreur de vérification:", error);
            return {
                success: false,
                message: "Erreur lors de la vérification"
            };
        }
    },
    
    // Function to get all passwords
    getPasswords: function() {
        try {
            const storedData = localStorage.getItem(this.storageKey);
            if (!storedData) {
                return [];
            }
            return JSON.parse(storedData);
        } catch (error) {
            console.error("Erreur de lecture:", error);
            return [];
        }
    },
    
    // Function to save passwords
    savePasswords: function(passwords) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(passwords));
            return {
                success: true,
                message: "Mots de passe sauvegardés"
            };
        } catch (error) {
            console.error("Erreur de sauvegarde:", error);
            return {
                success: false,
                message: "Erreur lors de la sauvegarde"
            };
        }
    },
    
    // Function to add a new password
    addPassword: function(password) {
        try {
            const passwords = this.getPasswords();
            if (!passwords.includes(password)) {
                passwords.push(password);
                return this.savePasswords(passwords);
            }
            return {
                success: false,
                message: "Ce mot de passe existe déjà"
            };
        } catch (error) {
            console.error("Erreur d'ajout:", error);
            return {
                success: false,
                message: "Erreur lors de l'ajout"
            };
        }
    },
    
    // Function to delete all passwords
    deletePasswords: function() {
        try {
            localStorage.removeItem(this.storageKey);
            return {
                success: true,
                message: "Mots de passe supprimés"
            };
        } catch (error) {
            console.error("Erreur de suppression:", error);
            return {
                success: false,
                message: "Erreur lors de la suppression"
            };
        }
    },
    
    // Function to import passwords from a file
    importPasswords: function(data) {
        try {
            // Vérifier si les données sont déjà un objet JSON
            const jsonData = typeof data === 'string' ? JSON.parse(data) : data;
            
            // Vérifier la structure du fichier
            if (!jsonData.passwords || !Array.isArray(jsonData.passwords)) {
                return {
                    success: false,
                    message: "Format de fichier invalide"
                };
            }

            // Sauvegarder les mots de passe
            const result = this.savePasswords(jsonData.passwords);
            if (result.success) {
                return {
                    success: true,
                    message: "Mots de passe importés avec succès"
                };
            } else {
                return {
                    success: false,
                    message: result.message
                };
            }
        } catch (error) {
            console.error("Erreur d'importation:", error);
            return {
                success: false,
                message: "Erreur lors de l'importation: " + error.message
            };
        }
    },
    
    // Function to export passwords to a file
    exportPasswords: function() {
        try {
            const passwords = this.getPasswords();
            const data = {
                version: "1.0",
                timestamp: new Date().toISOString(),
                passwords: passwords
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'tapngen_passwords.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            
            return {
                success: true,
                message: "Mots de passe exportés avec succès"
            };
        } catch (error) {
            console.error("Erreur d'exportation:", error);
            return {
                success: false,
                message: "Erreur lors de l'exportation"
            };
        }
    }
};

// Expose the password manager to the window object
window.passwordManager = passwordManager; 
