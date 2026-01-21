// src/pages/admin/Stock.tsx
import Swal from 'sweetalert2'; // Importar alertas

const Stock = () => {

  // Función para abrir el pop-up de ajuste de stock
  const handleAdjustStock = (productName: string, currentStock: number) => {
    Swal.fire({
      title: `Ajustar Stock: ${productName}`,
      input: 'number',
      inputLabel: 'Ingrese la nueva cantidad disponible',
      inputValue: currentStock,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (newStock) => {
        // Simulamos una petición al servidor (espera de 1 segundo)
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(newStock);
          }, 1000);
        });
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Actualizado!',
          text: `El nuevo stock de ${productName} es: ${result.value} unidades`,
          icon: 'success'
        });
        // NOTA: Aquí deberías llamar a una función para actualizar el estado real de React
        // Por ejemplo: updateProductStock(id, result.value)
      }
    });
  };

  return (
    <div className="container-fluid">
      <h2 className="mb-4 text-primary fw-bold">📦 Gestión de Inventario</h2>

      {/* Tarjetas Visuales de Stock */}
      <div className="row g-4 mb-5">
        {/* Cilindro 11kg */}
        <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                        <h5 className="fw-bold">Cilindros 11kg</h5>
                        <span className="text-muted">120 unid.</span>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                        <div className="progress-bar bg-warning" role="progressbar" style={{ width: '60%' }}></div>
                    </div>
                    <small className="text-muted mt-2 d-block">Estado: Normal</small>
                </div>
            </div>
        </div>

        {/* Cilindro 15kg */}
        <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                        <h5 className="fw-bold">Cilindros 15kg</h5>
                        <span className="text-muted">85 unid.</span>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                        <div className="progress-bar bg-primary" role="progressbar" style={{ width: '45%' }}></div>
                    </div>
                    <small className="text-muted mt-2 d-block">Estado: Normal</small>
                </div>
            </div>
        </div>

        {/* Cilindro 45kg (Crítico) */}
        <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100 border-bottom border-3 border-danger">
                <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                        <h5 className="fw-bold">Cilindros 45kg</h5>
                        <span className="text-danger fw-bold">12 unid.</span>
                    </div>
                    <div className="progress" style={{ height: '10px' }}>
                        <div className="progress-bar bg-danger" role="progressbar" style={{ width: '15%' }}></div>
                    </div>
                    <small className="text-danger mt-2 d-block fw-bold">⚠️ STOCK CRÍTICO</small>
                </div>
            </div>
        </div>
      </div>

      {/* Tabla de Detalle */}
      <div className="card shadow-sm border-0">
          <div className="card-header bg-white py-3 d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Detalle de Bodega</h5>
              <button className="btn btn-success btn-sm">+ Registrar Entrada</button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Tipo de Gas</th>
                            <th>En Bodega</th>
                            <th>En Ruta</th>
                            <th>Total Real</th>
                            <th>Estado</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Gas 11kg</strong></td>
                            <td>80</td>
                            <td>40</td>
                            <td>120</td>
                            <td><span className="badge bg-success">Óptimo</span></td>
                            <td>
                                <button 
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => handleAdjustStock('Gas 11kg', 80)}
                                >
                                    Ajustar
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Gas 15kg</strong></td>
                            <td>50</td>
                            <td>35</td>
                            <td>85</td>
                            <td><span className="badge bg-success">Óptimo</span></td>
                            <td>
                                <button 
                                    className="btn btn-sm btn-outline-secondary"
                                    onClick={() => handleAdjustStock('Gas 15kg', 50)}
                                >
                                    Ajustar
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td><strong>Gas 45kg</strong></td>
                            <td>5</td>
                            <td>7</td>
                            <td>12</td>
                            <td><span className="badge bg-danger">Reponer</span></td>
                            <td>
                                <button 
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleAdjustStock('Gas 45kg', 5)}
                                >
                                    Solicitar
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Stock;