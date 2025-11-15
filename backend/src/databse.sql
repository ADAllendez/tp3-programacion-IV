-- ============================================
-- CREACIÓN DE BASE DE DATOS
-- ============================================
DROP SCHEMA IF EXISTS transporte;
CREATE DATABASE IF NOT EXISTS transporte;
USE transporte;

-- ============================================
-- TABLA: usuario
-- ============================================
CREATE TABLE usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL -- encriptada con bcrypt
);

-- ============================================
-- TABLA: vehiculo
-- ============================================
CREATE TABLE vehiculo (
    id_vehiculo INT AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(100) NOT NULL,
    modelo VARCHAR(100) NOT NULL,
    patente VARCHAR(20) UNIQUE NOT NULL,
    anio YEAR NOT NULL,
    capacidad_carga DECIMAL(10,2) NOT NULL
);

-- ============================================
-- TABLA: conductor
-- ============================================
CREATE TABLE conductor (
    id_conductor INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(20) UNIQUE NOT NULL,
    licencia VARCHAR(50) NOT NULL,
    fecha_vencimiento_licencia DATE NOT NULL
);

-- ============================================
-- TABLA: viaje
-- ============================================
CREATE TABLE viaje (
    id_viaje INT AUTO_INCREMENT PRIMARY KEY,
    id_vehiculo INT NOT NULL,
    id_conductor INT NOT NULL,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME,
    origen VARCHAR(150) NOT NULL,
    destino VARCHAR(150) NOT NULL,
    kilometros DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_vehiculo) REFERENCES vehiculo(id_vehiculo)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (id_conductor) REFERENCES conductor(id_conductor)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- ============================================
-- PROCEDIMIENTO ALMACENADO: sp_registrar_viaje
-- ============================================
DELIMITER $$

CREATE PROCEDURE sp_registrar_viaje(
    IN p_id_vehiculo INT,
    IN p_id_conductor INT,
    IN p_fecha_inicio DATETIME,
    IN p_fecha_fin DATETIME,
    IN p_origen VARCHAR(150),
    IN p_destino VARCHAR(150),
    IN p_kilometros DECIMAL(10,2)
)
proc_body: BEGIN
    DECLARE v_vehiculo_cnt INT DEFAULT 0;
    DECLARE v_conductor_cnt INT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        SELECT 'ERROR' AS resultado, 'Se produjo un error. Transacción revertida.' AS mensaje;
    END;

    START TRANSACTION;

    -- 1) Verificar existencia del vehículo
    SELECT COUNT(*) INTO v_vehiculo_cnt FROM vehiculo WHERE id_vehiculo = p_id_vehiculo;
    IF v_vehiculo_cnt = 0 THEN
        ROLLBACK;
        SELECT 'ERROR' AS resultado, CONCAT('Vehículo no encontrado (id=', p_id_vehiculo, ')') AS mensaje;
        LEAVE proc_body;
    END IF;

    -- 2) Verificar existencia del conductor
    SELECT COUNT(*) INTO v_conductor_cnt FROM conductor WHERE id_conductor = p_id_conductor;
    IF v_conductor_cnt = 0 THEN
        ROLLBACK;
        SELECT 'ERROR' AS resultado, CONCAT('Conductor no encontrado (id=', p_id_conductor, ')') AS mensaje;
        LEAVE proc_body;
    END IF;

    -- 3) Registrar viaje
    INSERT INTO viaje (id_vehiculo, id_conductor, fecha_inicio, fecha_fin, origen, destino, kilometros)
    VALUES (p_id_vehiculo, p_id_conductor, p_fecha_inicio, p_fecha_fin, p_origen, p_destino, p_kilometros);

    COMMIT;
    SELECT 'OK' AS resultado, LAST_INSERT_ID() AS id_viaje;
END $$

DELIMITER ;