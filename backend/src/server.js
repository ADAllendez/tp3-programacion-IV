import app from './app.js';
import pool from './config/db.js';

const PORT = process.env.PORT || 4000;

const testDB = async () => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        console.log('✅ Conexión a MySQL exitosa:', rows[0].result);
    }catch (error) {
        console.error('❌ Error de conexión a MySQL:', error);
    }
};

app.listen(PORT, async () => {
    console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
    await testDB();
});