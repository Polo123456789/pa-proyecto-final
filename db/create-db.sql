-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema paProyectoFinal
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema paProyectoFinal
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `paProyectoFinal` DEFAULT CHARACTER SET utf8 ;
USE `paProyectoFinal` ;

-- -----------------------------------------------------
-- Table `paProyectoFinal`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paProyectoFinal`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `contra` CHAR(60) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paProyectoFinal`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paProyectoFinal`.`producto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `descripcion` VARCHAR(255) NULL,
  `categoria` VARCHAR(45) NULL,
  `existencias` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paProyectoFinal`.`proveedor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paProyectoFinal`.`proveedor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `telefono` CHAR(9) NULL,
  `correo` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paProyectoFinal`.`pedido`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paProyectoFinal`.`pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NULL,
  `entregado` TINYINT NULL,
  `cantidad` INT NULL,
  `proveedorId` INT NOT NULL,
  `productoId` INT NOT NULL,
  `usuarioId` INT NOT NULL,
  PRIMARY KEY (`id`, `proveedorId`, `productoId`, `usuarioId`),
  INDEX `fk_pedido_proveedor_idx` (`proveedorId` ASC) VISIBLE,
  INDEX `fk_pedido_producto1_idx` (`productoId` ASC) VISIBLE,
  INDEX `fk_pedido_usuario1_idx` (`usuarioId` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_proveedor`
    FOREIGN KEY (`proveedorId`)
    REFERENCES `paProyectoFinal`.`proveedor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_producto1`
    FOREIGN KEY (`productoId`)
    REFERENCES `paProyectoFinal`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_pedido_usuario1`
    FOREIGN KEY (`usuarioId`)
    REFERENCES `paProyectoFinal`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `paProyectoFinal`.`proveedorDaProducto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `paProyectoFinal`.`proveedorDaProducto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `proveedorId` INT NOT NULL,
  `productoId` INT NOT NULL,
  PRIMARY KEY (`id`, `proveedorId`, `productoId`),
  INDEX `fk_proveedorDaProducto_proveedor1_idx` (`proveedorId` ASC) VISIBLE,
  INDEX `fk_proveedorDaProducto_producto1_idx` (`productoId` ASC) VISIBLE,
  CONSTRAINT `fk_proveedorDaProducto_proveedor1`
    FOREIGN KEY (`proveedorId`)
    REFERENCES `paProyectoFinal`.`proveedor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proveedorDaProducto_producto1`
    FOREIGN KEY (`productoId`)
    REFERENCES `paProyectoFinal`.`producto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `paProyectoFinal`.`usuario`
-- -----------------------------------------------------
START TRANSACTION;
USE `paProyectoFinal`;
INSERT INTO `paProyectoFinal`.`usuario` (`id`, `nombre`, `contra`) VALUES (1, 'admin', '$2b$10$n/pwOV/VEOPyGpHIWk8fLupguLmpVS7ZyWJ4eZj2OSu6XOkk2t2Iu');

COMMIT;


-- -----------------------------------------------------
-- Data for table `paProyectoFinal`.`producto`
-- -----------------------------------------------------
START TRANSACTION;
USE `paProyectoFinal`;
INSERT INTO `paProyectoFinal`.`producto` (`id`, `nombre`, `descripcion`, `categoria`, `existencias`) VALUES (1, 'Manzana', 'Alimento Rojo', 'Alimentos', 50);

COMMIT;


-- -----------------------------------------------------
-- Data for table `paProyectoFinal`.`proveedor`
-- -----------------------------------------------------
START TRANSACTION;
USE `paProyectoFinal`;
INSERT INTO `paProyectoFinal`.`proveedor` (`id`, `nombre`, `telefono`, `correo`) VALUES (1, 'Manzanero S.A', '1122-3344', 'manzanero@example.com');
INSERT INTO `paProyectoFinal`.`proveedor` (`id`, `nombre`, `telefono`, `correo`) VALUES (2, 'Las Manzanas Rojas S.A', '2233-9900', 'rojas@example.com');

COMMIT;


-- -----------------------------------------------------
-- Data for table `paProyectoFinal`.`proveedorDaProducto`
-- -----------------------------------------------------
START TRANSACTION;
USE `paProyectoFinal`;
INSERT INTO `paProyectoFinal`.`proveedorDaProducto` (`id`, `proveedorId`, `productoId`) VALUES (1, 1, 1);
INSERT INTO `paProyectoFinal`.`proveedorDaProducto` (`id`, `proveedorId`, `productoId`) VALUES (2, 2, 1);

COMMIT;

