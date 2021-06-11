CREATE TABLE employees (
  ID SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  posicion VARCHAR(255),
  departamento VARCHAR(255),
  supervisor VARCHAR(255)
);

CREATE TABLE reports (
  ID SERIAL PRIMARY KEY,
  employee_id INT,
  concepto VARCHAR(255),
  fecha_desde VARCHAR(255),
  fecha_hasta VARCHAR(255),
  aprobado_por VARCHAR(255),
  firma VARCHAR(255),
  CONSTRAINT fk_user_id
      FOREIGN KEY(employee_id)
	  REFERENCES employees(id)
	  ON DELETE CASCADE
);

CREATE TABLE transaction_records (
  ID SERIAL PRIMARY KEY,
  report_id INT,
  fecha VARCHAR(255),
  cuenta VARCHAR(255),
  descripcion VARCHAR(255),
  total VARCHAR(255),
  CONSTRAINT fk_report_id
      FOREIGN KEY(report_id)
	  REFERENCES reports(id)
	  ON DELETE CASCADE
);



--- test data ---
INSERT INTO employees (nombre, posicion, departamento, supervisor)
VALUES  ('Alfonso Alvarado', 'Senior Master Chief developer', 'desarrollo', 'Luis Lopez');
INSERT INTO employees (nombre, posicion, departamento, supervisor)
VALUES  ('Miguel Lezcano', 'Junior developer', 'desarrollo', 'Luis Lopez');

INSERT INTO reports (employee_id, concepto, fecha_desde, fecha_hasta, aprobado_por, firma)
VALUES  (1, 'Compras varias', '31/12/1998','31/12/2050', 'Luis Lopez', 'Luis Lopez');

INSERT INTO reports (employee_id, concepto, fecha_desde, fecha_hasta, aprobado_por, firma)
VALUES  (2, '4 monsters', '10/6/2021','10/6/2021', 'yo mero', 'yo mero');


INSERT INTO transaction_records (report_id, fecha, cuenta, descripcion, total)
VALUES  (1, '10/6/2021', '123123', 'Gasto del mes', 600.00);

INSERT INTO transaction_records (report_id, fecha, cuenta, descripcion, total)
VALUES  (1, '11/6/2021', '123123', 'Gasto del mes 2', 1600.00);
