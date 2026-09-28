/**
 * SIF-SS // Sistema Integral Forense: Informe Científico-Técnico del Sitio del Suceso (Versión Móvil Android)
 */

const defaultState = {
  id: 'exp-' + Date.now(),
  fallecido: {
    nombres: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    apodo: '',
    run: '',
    nacionalidad: 'CHILENA',
    extranjeraCual: '',
    domicilio: '',
    sexo: 'M',
    edad: ''
  },
  comunicacion: {
    fecha: new Date().toISOString().split('T')[0],
    hora: '04:30',
    gepol: { '731': true, 'RETACO': false, 'REORPE': false, 'PREDES': false, 'motivo': '' },
    unidadFuncionarioComunica: '',
    fiscalTurno: '',
    flagrancia: 'NO',
    horaLlegadaSS: '05:15',
    direccionSS: '',
    coordenadasGPS: '',
    unidadCustodia: '',
    funcionarioCustodia: ''
  },
  antecedentes: {
    tieneRegistroNue: 'SI',
    tieneAntecedentes: 'SI',
    situacionCalle: false,
    discapacitado: false,
    drogadiccion: false,
    alcoholismo: false,
    otros: '',
    nue: '',
    fotoNue: '',
    descripcionNue: '',
    fechaRecepcion: new Date().toISOString().split('T')[0],
    horaRecepcion: '04:30',
    nombreRecepciona: '',
    institucionRecepciona: 'Bicrim San Javier'
  },
  bitacoraWeb: {
    estado: 'NO COMPARTIDA',
    numero: ''
  },
  clasificacionCaso: {
    delitoOHecho: 'DELITO',
    subtipo: 'Muerte y Hallazgo de Cadáver',
    presentaLesiones: 'SI'
  },
  predes: 'NO',
  tecnicosSS: { ubicacionCuerpo: '', ubicacionCuerpoOtro: '', orientacionCadaver: '', fijacionDosPuntos: '', medidaMaleolos: '' },
  antropometria: { sexo: 'M', edad: '', estatura: '', tez: 'Morena', cabello: '', colorIris: '🟤 Café', morfologia: '' },
  signosClinicos: { pupilas: 'Midriáticas: Dilatadas', palpacionCraneal: 'SIN LESIÓN O VESTIGIOS', pabellonAuricular: 'PÁLIDOS: Piel más Blanca', mucosaLabial: 'PÁLIDOS: Piel más Blanca', lechosUngueales: 'PÁLIDOS: Piel más Blanca', tempCuerpo: '', tempAmbiente: '' },
  tanatologia: { livideces: 'MÓVILES: Aparecen entre las primeras 3 a 10 horas.', rigidez: 'Completa', putrefaccion: '', maceracion: '' },
  lesionesFijadas: [],
  observaciones: '',
  incluirEmpadronadoWhatsapp: 'NO',
  tipoDeclaracionWhatsapp: 'EMPADRONADO',
  observacionesFinales: '',
  descripcionSS: '',
  vestimenta: { superiores: '', inferiores: '', calzado: '', abrigo: '', cuerpoEntero: '', otros: '' },
  peritosLacrim: { concurre: 'SI', fotografiaPlanimetria: true, balistica: false, huellografiaDactilos: true, informaticaForense: false, quimicaFisica: false },
  dataMuerte: '',
  causaProbable: 'INDETERMINADO A LA ESPERA DE LA AUTOPSIA',
  causaProbableOtro: '',
  horaFinExamenExterno: '',
  horaFinSS: '',
  fotografias12: [
    { id: 'f1', titulo: 'Fotografía S.S', completada: false },
    { id: 'f2', titulo: 'Fotografía General del Cadáver', completada: false },
    { id: 'f3', titulo: 'Fotografía del Rostro del Cadáver', completada: false },
    { id: 'f4', titulo: 'Fotografía de Extremidades Superiores', completada: false },
    { id: 'f5', titulo: 'Fotografía de Extremidades Inferiores', completada: false },
    { id: 'f6', titulo: 'Fotografía de Accesorios', completada: false },
    { id: 'f7', titulo: 'Fotografía de Vestimentas', completada: false },
    { id: 'f8', titulo: 'Fotografía de Pupilas', completada: false },
    { id: 'f9', titulo: 'Fotografía Plano Anterior del Cadáver Desnudo', completada: false },
    { id: 'f10', titulo: 'Fotografía Plano Posterior del Cadáver Desnudo', completada: false },
    { id: 'f11', titulo: 'Fotografía Muestra de Defensa', completada: false },
    { id: 'f12', titulo: 'Fotografía de Lesiones con Testigo Métrico', completada: false }
  ]
};

let appState = JSON.parse(JSON.stringify(defaultState));
let pendingZoneClick = null;

// HELPER PARA DEJAR TODOS LOS CAMPOS EN BLANCO
function getBlankCaseState() {
  return {
    id: 'exp-' + Date.now(),
    fallecido: { nombres: '', apellidoPaterno: '', apellidoMaterno: '', apodo: '', run: '', nacionalidad: '', extranjeraCual: '', domicilio: '', sexo: '', edad: '' },
    comunicacion: { fecha: '', hora: '', gepol: { '731': false, 'RETACO': false, 'REORPE': false, 'PREDES': false, 'motivo': '' }, unidadFuncionarioComunica: '', fiscalTurno: '', flagrancia: 'NO', horaLlegadaSS: '', direccionSS: '', coordenadasGPS: '', unidadCustodia: '', funcionarioCustodia: '' },
    antecedentes: { tieneRegistroNue: 'SI', tieneAntecedentes: 'SI', situacionCalle: false, discapacitado: false, drogadiccion: false, alcoholismo: false, otros: '', nue: '', cunoco: '', descripcionNue: '', fechaRecepcion: '', horaRecepcion: '', nombreRecepciona: '', institucionRecepciona: '' },
    bitacoraWeb: { estado: '', numero: '' },
    clasificacionCaso: { delitoOHecho: '', subtipo: '', presentaLesiones: '' },
    predes: '',
    tecnicosSS: { ubicacionCuerpo: '', ubicacionCuerpoOtro: '', orientacionCadaver: '', fijacionDosPuntos: '', medidaMaleolos: '' },
    antropometria: { sexo: '', edad: '', estatura: '', tez: '', cabello: '', colorIris: '', morfologia: '' },
    signosClinicos: { pupilas: '', palpacionCraneal: '', pabellonAuricular: '', mucosaLabial: '', lechosUngueales: '', tempCuerpo: '', tempAmbiente: '' },
    tanatologia: { livideces: '', rigidez: '', putrefaccion: '', maceracion: '' },
    lesionesFijadas: [],
    observaciones: '',
    observacionesFinales: '',
    descripcionSS: '',
    vestimenta: { superiores: '', inferiores: '', calzado: '', abrigo: '', cuerpoEntero: '', otros: '' },
    peritosLacrim: { concurre: '', fotografiaPlanimetria: false, balistica: false, huellografiaDactilos: false, informaticaForense: false, quimicaFisica: false },
    dataMuerte: '',
    causaProbable: '',
    causaProbableOtro: '',
    horaFinExamenExterno: '',
    horaFinSS: '',
    fotografias12: [
      { id: 'f1', titulo: 'Fotografía S.S', completada: false },
      { id: 'f2', titulo: 'Fotografía General del Cadáver', completada: false },
      { id: 'f3', titulo: 'Fotografía del Rostro del Cadáver', completada: false },
      { id: 'f4', titulo: 'Fotografía de Extremidades Superiores', completada: false },
      { id: 'f5', titulo: 'Fotografía de Extremidades Inferiores', completada: false },
      { id: 'f6', titulo: 'Fotografía de Accesorios', completada: false },
      { id: 'f7', titulo: 'Fotografía de Vestimentas', completada: false },
      { id: 'f8', titulo: 'Fotografía de Pupilas', completada: false },
      { id: 'f9', titulo: 'Fotografía Plano Anterior del Cadáver Desnudo', completada: false },
      { id: 'f10', titulo: 'Fotografía Plano Posterior del Cadáver Desnudo', completada: false },
      { id: 'f11', titulo: 'Fotografía Muestra de Defensa', completada: false },
      { id: 'f12', titulo: 'Fotografía de Lesiones con Testigo Métrico', completada: false }
    ]
  };
}

// GESTIÓN DE EXPEDIENTE: NUEVO REGISTRO / ELIMINAR
function createNewRecord() {
  if (confirm('¿Desea iniciar un NUEVO REGISTRO y dejar todos los campos en blanco?')) {
    appState = getBlankCaseState();

    document.querySelectorAll('[data-state-path]').forEach(input => {
      if (input.type === 'checkbox' || input.type === 'radio') {
        input.checked = false;
      } else {
        input.value = '';
      }
    });

    document.querySelectorAll('[data-state-checkbox]').forEach(chk => {
      chk.checked = false;
      const parent = chk.closest('.custom-checkbox');
      if (parent) parent.classList.remove('checked');
    });

    document.querySelectorAll('.pill-selector').forEach(selector => {
      selector.querySelectorAll('.pill-option').forEach(opt => opt.classList.remove('active'));
    });

    saveToStorage();
    bindStateToInputs();
    renderLesionsList();
    renderPhotoChecklist();
    renderOfficialDocument();
    showToast('📄 Todos los campos en blanco (Nuevo Registro iniciado)');
  }
}

function deleteCurrentRecord() {
  if (confirm('⚠️ ¿Está seguro de ELIMINAR este expediente por completo de la memoria?')) {
    localStorage.removeItem('sif_ss_android_case_data');
    appState = JSON.parse(JSON.stringify(defaultState));
    appState.id = 'exp-' + Date.now();
    bindStateToInputs();
    renderLesionsList();
    renderPhotoChecklist();
    renderOfficialDocument();
    showToast('🗑️ Expediente eliminado correctamente');
  }
}

function saveToStorage() {
  try {
    localStorage.setItem('sif_ss_android_case_data', JSON.stringify(appState));
  } catch (e) {
    console.error('Error al guardar en memoria local', e);
  }
}

function loadFromStorage() {
  const saved = localStorage.getItem('sif_ss_android_case_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      const base = JSON.parse(JSON.stringify(defaultState));
      appState = { ...base, ...parsed };
      appState.fallecido = { ...base.fallecido, ...(parsed.fallecido || {}) };
      appState.comunicacion = { ...base.comunicacion, ...(parsed.comunicacion || {}) };
      appState.antecedentes = { ...base.antecedentes, ...(parsed.antecedentes || {}) };
      appState.clasificacionCaso = { ...base.clasificacionCaso, ...(parsed.clasificacionCaso || {}) };
      appState.tecnicosSS = { ...base.tecnicosSS, ...(parsed.tecnicosSS || {}) };
      appState.antropometria = { ...base.antropometria, ...(parsed.antropometria || {}) };
      appState.signosClinicos = { ...base.signosClinicos, ...(parsed.signosClinicos || {}) };
      appState.tanatologia = { ...base.tanatologia, ...(parsed.tanatologia || {}) };
      appState.vestimenta = { ...base.vestimenta, ...(parsed.vestimenta || {}) };
      appState.peritosLacrim = { ...base.peritosLacrim, ...(parsed.peritosLacrim || {}) };
      appState.lesionesFijadas = Array.isArray(parsed.lesionesFijadas) ? parsed.lesionesFijadas : [];
      if (appState.fotografias12 && Array.isArray(appState.fotografias12)) {
        defaultState.fotografias12.forEach((defItem, idx) => {
          if (appState.fotografias12[idx]) {
            appState.fotografias12[idx].titulo = defItem.titulo;
          }
        });
      }
    } catch (e) {
      console.error('Error al parsear estado de storage', e);
    }
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// CONECTAR INPUTS CON APPSTATE
function bindStateToInputs() {
  document.querySelectorAll('[data-state-path]').forEach(input => {
    const path = input.getAttribute('data-state-path');
    const val = getNestedValue(appState, path);
    if (val !== undefined && val !== null) {
      input.value = val;
    }
    ['input', 'change'].forEach(eventType => {
      input.addEventListener(eventType, (e) => {
        setNestedValue(appState, path, e.target.value);
        if (path === 'causaProbable') updateCausaProbableUI();
        if (path === 'tecnicosSS.ubicacionCuerpo') updateUbicacionCuerpoUI();
        if (path === 'bitacoraWeb.estado') updateBitacoraWebUI();
        if (path === 'antropometria.morfologia') updateMorfologiaUI();
        if (path === 'fallecido.nacionalidad') updateExtranjeraCualUI();
        saveToStorage();
        renderOfficialDocument();
      });
    });
  });

  document.querySelectorAll('[data-state-checkbox]').forEach(chk => {
    const path = chk.getAttribute('data-state-checkbox');
    const val = getNestedValue(appState, path);
    chk.checked = !!val;
    const parent = chk.closest('.custom-checkbox');
    if (parent) parent.classList.toggle('checked', chk.checked);

    chk.addEventListener('change', (e) => {
      setNestedValue(appState, path, e.target.checked);
      if (parent) parent.classList.toggle('checked', e.target.checked);
      updateGepolUI();
      saveToStorage();
      renderOfficialDocument();
    });
  });

  document.querySelectorAll('.chk-morfologia').forEach(chk => {
    chk.addEventListener('change', (e) => {
      if (!appState.antropometria) appState.antropometria = {};
      if (e.target.checked) {
        appState.antropometria.morfologia = e.target.value;
      } else if (appState.antropometria.morfologia === e.target.value) {
        appState.antropometria.morfologia = '';
      }
      updateMorfologiaUI();
      saveToStorage();
      renderOfficialDocument();
    });
  });

  document.querySelectorAll('.pill-selector').forEach(selector => {
    const path = selector.getAttribute('data-state-path');
    const currentVal = getNestedValue(appState, path);
    selector.querySelectorAll('.pill-option').forEach(opt => {
      opt.classList.toggle('active', opt.getAttribute('data-value') === currentVal);
      opt.addEventListener('click', () => {
        selector.querySelectorAll('.pill-option').forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        setNestedValue(appState, path, opt.getAttribute('data-value'));
        if (path === 'clasificacionCaso.presentaLesiones') {
          updateLesionesUI();
        }
        if (path === 'peritosLacrim.concurre') {
          updatePeritosLacrimUI();
        }
        if (path === 'comunicacion.flagrancia') {
          updateFlagranciaUI();
        }
        if (path === 'antecedentes.tieneAntecedentes') {
          updateAntecedentesUI();
        }
        if (path === 'antecedentes.tieneRegistroNue') {
          updateRegistroNueUI();
        }
        saveToStorage();
        renderOfficialDocument();
      });
    });
  });

  updateLesionesUI();
  updatePeritosLacrimUI();
  updateGepolUI();
  updateCausaProbableUI();
  updateUbicacionCuerpoUI();
  updateBitacoraWebUI();
  updateFlagranciaUI();
  updateAntecedentesUI();
  updateRegistroNueUI();
  updateMorfologiaUI();
  updateExtranjeraCualUI();

  const btnFetchTemp = document.getElementById('btnFetchTemp');
  if (btnFetchTemp) {
    btnFetchTemp.addEventListener('click', () => {
      if (!navigator.geolocation) {
        alert('La geolocalización no está soportada por su navegador o dispositivo.');
        return;
      }
      const originalHTML = btnFetchTemp.innerHTML;
      btnFetchTemp.disabled = true;
      btnFetchTemp.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Buscando...';

      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
          if (!res.ok) throw new Error('Error en API climática');
          const data = await res.json();
          const temp = data?.current_weather?.temperature;
          if (temp !== undefined && temp !== null) {
            if (!appState.signosClinicos) appState.signosClinicos = {};
            appState.signosClinicos.tempAmbiente = temp;
            const inputTemp = document.getElementById('inputTempAmbiente') || document.querySelector('[data-state-path="signosClinicos.tempAmbiente"]');
            if (inputTemp) inputTemp.value = temp;
            saveToStorage();
            renderOfficialDocument();
            btnFetchTemp.innerHTML = `<i class="fa-solid fa-check"></i> ${temp} °C`;
            setTimeout(() => {
              btnFetchTemp.disabled = false;
              btnFetchTemp.innerHTML = originalHTML;
            }, 3000);
          } else {
            throw new Error('Sin datos de temperatura');
          }
        } catch (err) {
          console.error('Error obteniendo clima:', err);
          alert('No se pudo obtener el clima desde la Web. Verifique su conexión a internet.');
          btnFetchTemp.disabled = false;
          btnFetchTemp.innerHTML = originalHTML;
        }
      }, (error) => {
        console.error('Error de GPS:', error);
        alert('No se pudo acceder al GPS. Asegúrese de otorgar permisos de ubicación en su dispositivo.');
        btnFetchTemp.disabled = false;
        btnFetchTemp.innerHTML = originalHTML;
      }, { enableHighAccuracy: true, timeout: 10000 });
    });
  }
}

function updateLesionesUI() {
  const boxSi = document.getElementById('boxLesionesSi');
  const boxNo = document.getElementById('boxLesionesNo');
  const cardBodyMapper = document.getElementById('cardBodyMapper');
  const presenta = appState.clasificacionCaso?.presentaLesiones || 'SI';

  if (boxSi && boxNo) {
    if (presenta === 'SI') {
      boxSi.style.display = 'flex';
      boxNo.style.display = 'none';
      if (cardBodyMapper) {
        cardBodyMapper.style.pointerEvents = 'auto';
        cardBodyMapper.style.opacity = '1';
        cardBodyMapper.style.filter = 'none';
      }
    } else {
      boxSi.style.display = 'none';
      boxNo.style.display = 'block';
      if (cardBodyMapper) {
        cardBodyMapper.style.pointerEvents = 'none';
        cardBodyMapper.style.opacity = '0.45';
        cardBodyMapper.style.filter = 'grayscale(80%)';
      }
    }
  }
}

function updatePeritosLacrimUI() {
  const boxList = document.getElementById('boxPeritosLacrimList');
  const boxNo = document.getElementById('boxPeritosLacrimNo');
  const concurre = appState.peritosLacrim?.concurre || 'SI';

  if (boxList && boxNo) {
    if (concurre === 'SI') {
      boxList.style.display = 'block';
      boxNo.style.display = 'none';
    } else {
      boxList.style.display = 'none';
      boxNo.style.display = 'block';
    }
  }
}

function updateGepolUI() {
  const boxMotivo = document.getElementById('boxGepolMotivo');
  if (!boxMotivo) return;
  const gepol = appState.comunicacion?.gepol || {};
  const requiresMotivo = gepol.RETACO || gepol.REORPE || gepol.PREDES;
  boxMotivo.style.display = requiresMotivo ? 'block' : 'none';
}

function updateCausaProbableUI() {
  const boxOtro = document.getElementById('boxCausaProbableOtro');
  if (!boxOtro) return;
  const causa = appState.causaProbable || '';
  boxOtro.style.display = causa === 'OTRO' ? 'block' : 'none';
}

function updateUbicacionCuerpoUI() {
  const boxOtro = document.getElementById('boxUbicacionCuerpoOtro');
  if (!boxOtro) return;
  const ubic = appState.tecnicosSS?.ubicacionCuerpo || '';
  boxOtro.style.display = ubic === 'OTRO' ? 'block' : 'none';
}

function updateMorfologiaUI() {
  const morf = appState.antropometria?.morfologia || '';
  document.querySelectorAll('.chk-morfologia').forEach(chk => {
    const checked = chk.value === morf;
    chk.checked = checked;
    const parent = chk.closest('.custom-checkbox');
    if (parent) parent.classList.toggle('checked', checked);
  });
}

function updateExtranjeraCualUI() {
  const box = document.getElementById('boxExtranjeraCual');
  if (!box) return;
  const nac = appState.fallecido?.nacionalidad || 'CHILENA';
  box.style.display = nac === 'EXTRANJERA' ? 'block' : 'none';
}

function updateBitacoraWebUI() {
  const boxNumero = document.getElementById('boxBitacoraNumero');
  const boxAviso = document.getElementById('boxBitacoraAvisoNoHay');
  if (!boxNumero || !boxAviso) return;
  const estado = appState.bitacoraWeb?.estado || 'NO COMPARTIDA';
  boxNumero.style.display = estado === 'SI' ? 'block' : 'none';
  boxAviso.style.display = estado === 'NO HAY' ? 'flex' : 'none';
}

function updateFlagranciaUI() {
  const hint = document.getElementById('flagranciaHint');
  if (!hint) return;
  const flag = appState.comunicacion?.flagrancia || 'NO';
  hint.style.display = flag === 'SI' ? 'block' : 'none';
}

function updateAntecedentesUI() {
  const boxSi = document.getElementById('boxAntecedentesSi');
  const boxNo = document.getElementById('boxAntecedentesNo');
  if (!boxSi || !boxNo) return;
  const tiene = appState.antecedentes?.tieneAntecedentes || 'SI';
  boxSi.style.display = tiene === 'SI' ? 'block' : 'none';
  boxNo.style.display = tiene === 'NO' ? 'flex' : 'none';
}

function renderFotoNueUI() {
  const emptyBox = document.getElementById('fotoNueEmpty');
  const previewBox = document.getElementById('fotoNuePreview');
  const imgElement = document.getElementById('imgFotoNue');
  if (!emptyBox || !previewBox || !imgElement) return;

  const foto = appState.antecedentes?.fotoNue;
  if (foto) {
    imgElement.src = foto;
    emptyBox.style.display = 'none';
    previewBox.style.display = 'flex';
  } else {
    imgElement.src = '';
    emptyBox.style.display = 'flex';
    previewBox.style.display = 'none';
  }
}

function initFotoNueCapture() {
  const fileInput = document.getElementById('inputFotoNue');
  const btnEliminar = document.getElementById('btnEliminarFotoNue');

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (evt) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxW = 1000;
          const maxH = 1000;
          let w = img.width;
          let h = img.height;
          if (w > maxW || h > maxH) {
            if (w > h) {
              h = Math.round((h * maxW) / w);
              w = maxW;
            } else {
              w = Math.round((w * maxH) / h);
              h = maxH;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

          if (!appState.antecedentes) appState.antecedentes = {};
          appState.antecedentes.fotoNue = compressedDataUrl;
          saveToStorage();
          renderFotoNueUI();
          renderOfficialDocument();
          showToast('📸 Foto del comprobante NUE fijada exitosamente');
        };
        img.src = evt.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  if (btnEliminar) {
    btnEliminar.addEventListener('click', () => {
      if (appState.antecedentes) {
        appState.antecedentes.fotoNue = '';
      }
      const fileInput = document.getElementById('inputFotoNue');
      if (fileInput) fileInput.value = '';
      saveToStorage();
      renderFotoNueUI();
      renderOfficialDocument();
      showToast('🗑️ Foto NUE eliminada');
    });
  }
}

function updateRegistroNueUI() {
  const boxSi = document.getElementById('boxRegistroNueSi');
  const boxNo = document.getElementById('boxRegistroNueNo');
  if (!boxSi || !boxNo) return;
  const tiene = appState.antecedentes?.tieneRegistroNue || 'SI';
  boxSi.style.display = tiene === 'SI' ? 'block' : 'none';
  boxNo.style.display = tiene === 'NO' ? 'flex' : 'none';
  renderFotoNueUI();
}

function switchToTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  const btn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
  if (btn) btn.classList.add('active');
  document.getElementById(tabId)?.classList.add('active');
  const navTabs = document.querySelector('.nav-tabs');
  if (navTabs && btn) {
    const leftPos = Math.max(0, btn.offsetLeft - 14);
    navTabs.scrollTo({ left: leftPos, behavior: 'smooth' });
  }
  if (tabId === 'tab-examen') {
    updateLesionesUI();
    renderLesionsList();
  }
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

function setNestedValue(obj, path, value) {
  const parts = path.split('.');
  const last = parts.pop();
  const target = parts.reduce((acc, part) => {
    if (!acc[part]) acc[part] = {};
    return acc[part];
  }, obj);
  target[last] = value;
}

// BODY MAPPER
function initBodyMapper() {
  document.querySelectorAll('.body-zone').forEach(zone => {
    zone.addEventListener('click', (e) => {
      const zoneName = zone.getAttribute('data-zone-name');
      const pinsContainer = document.getElementById('lesionPinsContainer') || zone.closest('.silhouettes-wrapper');
      const rect = pinsContainer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      pendingZoneClick = {
        plano: zoneName,
        posX: Math.max(3, Math.min(97, x)),
        posY: Math.max(3, Math.min(97, y)),
        coords: zone.getAttribute('data-svg-coords')
      };

      document.getElementById('modalZoneTitle').innerText = `Fijar Lesión en: ${zoneName}`;
      document.getElementById('lesionModalOverlay').classList.add('active');
    });
  });

  document.getElementById('btnCancelModal').addEventListener('click', () => {
    document.getElementById('lesionModalOverlay').classList.remove('active');
    pendingZoneClick = null;
  });

  document.getElementById('formAddLesion').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!pendingZoneClick) return;

    const tipo = document.getElementById('lesionTipo').value;
    const dimension = document.getElementById('lesionDimension').value || 'Sin dimensión especificada';
    const desc = document.getElementById('lesionDesc').value || 'Sin descripción adicional';

    const nuevaLesion = {
      id: 'L-' + Date.now(),
      plano: pendingZoneClick.plano,
      tipo,
      dimension,
      desc,
      posX: pendingZoneClick.posX,
      posY: pendingZoneClick.posY,
      coords: pendingZoneClick.coords
    };

    appState.lesionesFijadas.push(nuevaLesion);
    saveToStorage();
    renderLesionsList();
    renderOfficialDocument();

    document.getElementById('lesionModalOverlay').classList.remove('active');
    document.getElementById('formAddLesion').reset();
    pendingZoneClick = null;
    showToast(`📍 Lesión fijada con punto rojo: ${tipo}`);
  });
}

function renderLesionsList() {
  const container = document.getElementById('lesionsListContainer');
  const pinsContainer = document.getElementById('lesionPinsContainer');

  // Quitar pines rojos previos del Body Mapper
  if (pinsContainer) {
    pinsContainer.querySelectorAll('.lesion-pin').forEach(pin => pin.remove());
  }

  // Dibujar los puntos rojos (.lesion-pin) en la silueta anatómica
  appState.lesionesFijadas.forEach((l, idx) => {
    if (pinsContainer) {
      let x = l.posX;
      let y = l.posY;
      if ((x === undefined || y === undefined) && l.coords) {
        const parts = String(l.coords).split(',').map(Number);
        if (parts.length === 2) {
          x = parts[0];
          y = parts[1];
        }
      }
      if (x !== undefined && y !== undefined) {
        const pin = document.createElement('div');
        pin.className = 'lesion-pin';
        pin.style.left = `${x}%`;
        pin.style.top = `${y}%`;
        pin.textContent = idx + 1;
        pin.title = `Lesión #${idx + 1}: ${l.tipo} (${l.plano})`;
        pin.addEventListener('click', (ev) => {
          ev.stopPropagation();
          showToast(`📍 Lesión #${idx + 1}: ${l.tipo} - ${l.plano}`);
        });
        pinsContainer.appendChild(pin);
      }
    }
  });

  if (!container) return;

  if (appState.lesionesFijadas.length === 0) {
    container.innerHTML = `
      <div id="lesionsEmptyMsg" style="color: var(--text-muted); text-align: center; padding: 2rem 1rem;">
        <i class="fa-solid fa-notes-medical" style="font-size: 2.2rem; margin-bottom: 0.8rem; opacity: 0.5;"></i>
        <p style="font-weight: 600; font-size: 0.95rem;">Sin lesiones fijadas en las siluetas anatómicas</p>
        <p style="font-size: 0.82rem; margin-top: 0.4rem; color: var(--text-dim);">Haz clic directamente sobre cualquier silueta para registrar una lesión y dejar el punto rojo marcado.</p>
      </div>`;
    return;
  }

  container.innerHTML = appState.lesionesFijadas.map((l, idx) => `
    <div class="lesion-item">
      <div style="display: flex; gap: 0.75rem; align-items: flex-start;">
        <span class="lesion-item-num">${idx + 1}</span>
        <div>
          <div style="font-weight: 700; font-size: 0.92rem; color: var(--text-main);">${l.tipo}</div>
          <div style="font-size: 0.78rem; color: var(--accent-primary); font-weight: 600;">Zona: ${l.plano} | Dimensión: ${l.dimension}</div>
          <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 0.3rem;">${l.desc}</div>
        </div>
      </div>
      <button type="button" class="btn btn-danger btn-sm" onclick="eliminarLesion('${l.id}')">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `).join('');
}

window.eliminarLesion = function(id) {
  appState.lesionesFijadas = appState.lesionesFijadas.filter(l => l.id !== id);
  saveToStorage();
  renderLesionsList();
  renderOfficialDocument();
  showToast('🗑️ Lesión eliminada');
};

// CHECKLIST FOTOGRÁFICO OPTIMIZADO (SOLO ENCABEZADOS Y SELECCIÓN LISTO)
function renderPhotoChecklist() {
  const grid = document.getElementById('photoChecklistGrid');
  if (!grid) return;

  const total = appState.fotografias12.length;
  const comp = appState.fotografias12.filter(f => f.completada).length;
  const fill = document.getElementById('photoProgressBarFill');
  const label = document.getElementById('photoProgressLabel');
  if (fill) fill.style.width = `${(comp / total) * 100}%`;
  if (label) label.innerText = `${comp} de ${total} fotografías fijadas (${Math.round((comp / total) * 100)}%)`;

  grid.innerHTML = appState.fotografias12.map((f, idx) => `
    <label class="custom-checkbox ${f.completada ? 'checked' : ''}" style="display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 1.1rem; background: var(--bg-input); border: 1px solid ${f.completada ? 'var(--accent-primary)' : 'var(--border-color)'}; border-radius: var(--radius-sm); cursor: pointer; transition: var(--transition);">
      <span style="display: flex; align-items: center; gap: 0.75rem; font-weight: 600; font-size: 0.92rem; color: ${f.completada ? '#fff' : 'var(--text-main)'};">
        <span style="color: var(--accent-primary); font-weight: 800;">#${idx + 1}</span>
        <span>${f.titulo}</span>
      </span>
      <div style="display: flex; align-items: center; gap: 0.6rem;">
        <span style="font-size: 0.75rem; font-weight: 700; color: ${f.completada ? 'var(--accent-primary)' : 'var(--text-dim)'};">${f.completada ? 'LISTO' : 'PENDIENTE'}</span>
        <input type="checkbox" ${f.completada ? 'checked' : ''} onchange="togglePhoto('${f.id}', this.checked)" style="width: 20px; height: 20px; accent-color: var(--accent-primary);">
      </div>
    </label>
  `).join('');
}

window.togglePhoto = function(id, checked) {
  const photo = appState.fotografias12.find(f => f.id === id);
  if (photo) {
    photo.completada = checked;
    delete photo.imgUrl;
    saveToStorage();
    renderPhotoChecklist();
  }
};

// DOCUMENTO OFICIAL BICRIM SAN JAVIER
function renderOfficialDocument() {
  const el = document.getElementById('officialDocumentContent');
  if (!el) return;

  const f = appState.fallecido || {};
  const c = appState.comunicacion || {};
  const ant = appState.antecedentes || {};
  const clasif = appState.clasificacionCaso || {};
  const t = appState.tecnicosSS || {};
  const antro = appState.antropometria || {};
  const sig = appState.signosClinicos || {};
  const tan = appState.tanatologia || {};
  const vest = appState.vestimenta || {};
  const lacrim = appState.peritosLacrim || {};
  const fotos = appState.fotografias12 || [];
  const fotosListas = fotos.filter(x => x.completada).length;

  // Formateo de Fiscal y Flagrancia
  const fiscalTexto = c.flagrancia === 'SI'
    ? `${c.fiscalTurno || 'SIN REGISTRAR'}, DE LA FISCALÍA DE FLAGRANCIA MAULE`
    : (c.fiscalTurno || 'SIN REGISTRAR');

  // Formateo de ubicación
  const ubicacionTexto = t.ubicacionCuerpo === 'OTRO'
    ? (t.ubicacionCuerpoOtro || 'OTRA UBICACIÓN')
    : (t.ubicacionCuerpo || 'NO REGISTRADA');

  // Formateo causa probable
  const causaTexto = appState.causaProbable === 'OTRO'
    ? (appState.causaProbableOtro || 'OTRO (SIN ESPECIFICAR)')
    : (appState.causaProbable || 'INDETERMINADO');

  el.innerHTML = `
    <div class="official-header">
      <h1>POLICÍA DE INVESTIGACIONES DE CHILE</h1>
      <p>LABORATORIO DE CRIMINALÍSTICA // ${appState.unidadPolicial || 'BICRIM SAN JAVIER'}</p>
      <p style="margin-top: 4px; font-weight: 700; color: #0f172a;">INFORME CIENTÍFICO TÉCNICO DEL SITIO DEL SUCESO</p>
    </div>

    <!-- ============================================================= -->
    <!-- PESTAÑA 1: COMUNICACIÓN, FILIACIÓN Y ANTECEDENTES             -->
    <!-- ============================================================= -->
    <div class="official-tab-header">PESTAÑA 1: COMUNICACIÓN, FILIACIÓN Y ANTECEDENTES</div>

    <div class="official-section-title">I. OFICIAL A CARGO DEL SITIO DEL SUCESO</div>
    <div class="official-line">
      <span class="official-label">OFICIAL A CARGO:</span>
      <span class="official-value" style="font-weight: 800;">
        ${appState.oficialCargo || 'JORGE PINO AVILA'} — <span style="font-size: 8.5pt; font-weight: 600; color: #475569;">${appState.unidadPolicial || 'BICRIM SAN JAVIER'}</span>
      </span>
    </div>

    <div class="official-section-title">II. CALIFICACIÓN DEL SITIO DEL SUCESO</div>
    <div class="official-line"><span class="official-label">CALIFICACIÓN / DELITO:</span><span class="official-value" style="font-weight: 800;">${(clasif.delitoOHecho || 'DELITO').toUpperCase()} — ${(clasif.subtipo || 'MUERTE Y HALLAZGO DE CADÁVER').toUpperCase()}</span></div>
    <div class="official-line"><span class="official-label">¿PRESENTA LESIONES?:</span><span class="official-value">${clasif.presentaLesiones || 'SI'}</span></div>

    <div class="official-section-title">III. IDENTIFICACIÓN Y FILIACIÓN DEL FALLECIDO</div>
    <div class="official-line"><span class="official-label">NOMBRE COMPLETO:</span><span class="official-value">${(f.nombres || '') + ' ' + (f.apellidoPaterno || '') + ' ' + (f.apellidoMaterno || '')} ${f.apodo ? '("' + f.apodo + '")' : ''}</span></div>
    <div class="official-line"><span class="official-label">RUN / IDENTIFICACIÓN:</span><span class="official-value">${f.run || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">SEXO / EDAD:</span><span class="official-value">${f.sexo === 'M' ? 'MASCULINO' : f.sexo === 'F' ? 'FEMENINO' : (f.sexo || 'M')} / ${f.edad || 'SIN REGISTRAR'} AÑOS</span></div>
    <div class="official-line"><span class="official-label">NACIONALIDAD:</span><span class="official-value">${f.nacionalidad || 'CHILENA'} ${f.extranjeraCual ? '(' + f.extranjeraCual + ')' : ''}</span></div>
    <div class="official-line"><span class="official-label">DOMICILIO FIJO:</span><span class="official-value">${f.domicilio || 'SIN REGISTRAR'}</span></div>

    <div class="official-section-title">IV. COMUNICACIÓN DEL SITIO DEL SUCESO Y FISCAL DE TURNO</div>
    <div class="official-line"><span class="official-label">FECHA / HORA COMUNICACIÓN:</span><span class="official-value">${c.fecha || '--/--/----'} A LAS ${c.hora || '--:--'} HRS.</span></div>
    <div class="official-line"><span class="official-label">FISCAL DE TURNO:</span><span class="official-value" style="font-weight: 800; color: #0f172a;">${fiscalTexto}</span></div>
    <div class="official-line"><span class="official-label">UNIDAD COMUNICA:</span><span class="official-value">${c.unidadFuncionarioComunica || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">LUGAR DEL S.S.:</span><span class="official-value">${c.direccionSS || 'SIN REGISTRAR'}${c.comunaSS ? ' — COMUNA: ' + c.comunaSS : ''}</span></div>
    <div class="official-line"><span class="official-label">COORDENADAS GPS:</span><span class="official-value">${c.coordenadasGPS || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">CUSTODIA S.S.:</span><span class="official-value">${c.unidadCustodia || ''} - ${c.funcionarioCustodia || ''}</span></div>

    <div class="official-section-title">V. CÓDIGOS OPERATIVOS GEPOL</div>
    <div class="official-line"><span class="official-label">CÓDIGOS OPERATIVOS:</span><span class="official-value">${Object.entries(c.gepol || {}).filter(([k, v]) => k !== 'motivo' && v).map(([k]) => k).join(', ') || 'NINGUNO'} ${c.gepol?.motivo ? `— <b>MOTIVO:</b> ${c.gepol.motivo}` : ''}</span></div>

    <div class="official-section-title">VI. ANTECEDENTES CLÍNICOS / SITUACIONALES</div>
    <div class="official-line"><span class="official-label">ANTECEDENTES CLÍNICOS:</span><span class="official-value">${
      ant.tieneAntecedentes === 'NO' ? 'SIN ANTECEDENTES CLÍNICOS' : [
        ant.situacionCalle ? 'Situación de Calle' : null,
        ant.discapacitado ? 'Persona en Situación de Discapacidad' : null,
        ant.drogadiccion ? 'Dependencia o Consumo de Sustancias' : null,
        ant.alcoholismo ? 'Trastorno por Consumo de Alcohol' : null,
        ant.otros ? `Otro: ${ant.otros}` : null
      ].filter(Boolean).join(' // ') || 'NINGUNO MARCADO'
    }</span></div>

    <!-- ============================================================= -->
    <!-- PESTAÑA 2: EXAMEN CORPORAL, ANTROPOMETRÍA Y CROQUIS ANATÓMICO -->
    <!-- ============================================================= -->
    <div class="html2pdf__page-break"></div>
    <div class="official-tab-header" style="margin-top: 20px;">PESTAÑA 2: EXAMEN CORPORAL, ANTROPOMETRÍA Y CROQUIS ANATÓMICO</div>

    <div class="official-section-title">VII. UBICACIÓN DEL CUERPO EN EL SITIO DEL SUCESO</div>
    <div class="official-line"><span class="official-label">LUGAR DEL HALLAZGO:</span><span class="official-value" style="font-weight: 800; color: #0f172a;">${ubicacionTexto}</span></div>

    <div class="official-section-title">VIII. TOPOGRAFÍA Y ORIENTACIÓN DEL CADÁVER</div>
    <div class="official-line"><span class="official-label">ORIENTACIÓN DEL CADÁVER:</span><span class="official-value">${t.orientacionCadaver || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">FIJACIÓN EN DOS PUNTOS:</span><span class="official-value">${t.fijacionDosPuntos || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">MEDIDA MALÉOLOS / CABEZA:</span><span class="official-value">${t.medidaMaleolos || 'SIN REGISTRAR'}</span></div>

    <div class="official-section-title">IX. ANTROPOMETRÍA Y RASGOS FÍSICOS</div>
    <div class="official-line"><span class="official-label">ESTATURA / COLOR DE TEZ:</span><span class="official-value">${antro.estatura || 'SIN REGISTRAR'} CM // ${antro.tez || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">CABELLO / COLOR IRIS:</span><span class="official-value">${antro.cabello || 'SIN REGISTRAR'} // ${antro.colorIris || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">MORFOLOGÍA DEL CUERPO:</span><span class="official-value" style="font-weight: 700; color: #0f172a;">${antro.morfologia || 'SIN REGISTRAR'}</span></div>

    <div class="official-section-title">X. EXAMEN CLÍNICO FORENSE Y TEMPERATURAS</div>
    <div class="official-line"><span class="official-label">PUPILAS / PALPACIÓN CRANEAL:</span><span class="official-value">${sig.pupilas || 'SIN REGISTRAR'} // ${sig.palpacionCraneal || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">MUCOSA LABIAL / LECHOS UNGUEALES:</span><span class="official-value">${sig.mucosaLabial || 'SIN REGISTRAR'} // ${sig.lechosUngueales || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">TEMPERATURA CUERPO / AMBIENTE:</span><span class="official-value">${sig.tempCuerpo || 'SIN REGISTRAR'} // ${sig.tempAmbiente || 'SIN REGISTRAR'}</span></div>

    <div class="official-section-title">XI. TANATOLOGÍA Y FENÓMENOS CADAVÉRICOS</div>
    <div class="official-line"><span class="official-label">LIVIDECES CADAVÉRICAS:</span><span class="official-value">${tan.livideces || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">RIGIDEZ CADAVÉRICA:</span><span class="official-value">${tan.rigidez || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">FENÓMENOS DE PUTREFACCIÓN:</span><span class="official-value">${tan.putrefaccion || 'SIN REGISTRAR'}</span></div>

    <div class="official-section-title">XII. LESIONES FORENSES FIJADAS EN CROQUIS ANATÓMICO (${clasif.presentaLesiones === 'NO' ? '0' : appState.lesionesFijadas.length})</div>
    ${clasif.presentaLesiones === 'NO' ? `
      <div style="padding: 10px 14px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; font-weight: 700; color: #1e293b;">
        NO SE OBSERVARON LESIONES ATRIBUIBLES A TERCERAS PERSONAS.
      </div>
    ` : appState.lesionesFijadas.length > 0 ? `
      <table class="official-table">
        <thead><tr><th>N°</th><th>Plano Anatómico</th><th>Tipo de Lesión</th><th>Dimensiones</th><th>Descripción</th></tr></thead>
        <tbody>
          ${appState.lesionesFijadas.map((l, i) => `<tr><td>${i+1}</td><td>${l.plano}</td><td>${l.tipo}</td><td>${l.dimension}</td><td>${l.desc}</td></tr>`).join('')}
        </tbody>
      </table>
    ` : '<p style="font-size: 10pt; color: #64748b;">SIN LESIONES FIJADAS EN EL CROQUIS ANATÓMICO.</p>'}

    <div class="official-section-title">XIII. OBSERVACIONES ADICIONALES EN EL EXAMEN EXTERNO</div>
    <div style="padding: 10px 14px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 9.5pt; color: #1e293b; white-space: pre-wrap;">
      ${appState.observaciones || 'SIN OBSERVACIONES REGISTRADAS EN EL EXAMEN EXTERNO.'}
    </div>

    <!-- ============================================================= -->
    <!-- PESTAÑA 3: VESTIMENTA, PERITOS Y CONCLUSIONES                 -->
    <!-- ============================================================= -->
    <div class="html2pdf__page-break"></div>
    <div class="official-tab-header" style="margin-top: 20px;">PESTAÑA 3: VESTIMENTA, PERITOS Y CONCLUSIONES</div>

    <div class="official-section-title">XIV. CONCURRENCIA PERITOS LACRIM</div>
    <div style="padding: 10px 14px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 9.5pt; color: #1e293b;">
      ${lacrim.concurre === 'NO' ? 'SIN CONCURRENCIA DE PERITOS LACRIM AL SITIO DEL SUCESO' : `
        <b>ESPECIALIDADES INTERVINIENTES:</b><br>
        ${lacrim.fotografiaPlanimetria ? '• Fotografía Forense y Planimetría<br>' : ''}
        ${lacrim.balistica ? '• Balística Forense<br>' : ''}
        ${lacrim.huellografiaDactilos ? '• Huellografía y Dactiloscopía<br>' : ''}
        ${lacrim.informaticaForense ? '• Informática Forense<br>' : ''}
        ${lacrim.quimicaFisica ? '• Química y Física Forense<br>' : ''}
      `}
    </div>

    <div class="official-section-title">XV. ANTECEDENTES: REGISTRO NUE Y RECEPCIÓN INSTITUCIONAL</div>
    <div class="official-line"><span class="official-label">NUE N°:</span><span class="official-value">${ant.tieneRegistroNue === 'NO' ? 'SIN REGISTRO' : (ant.nue || 'SIN REGISTRAR')}</span></div>
    <div class="official-line"><span class="official-label">BITÁCORA WEB:</span><span class="official-value" style="font-weight: 700; color: ${appState.bitacoraWeb?.estado === 'NO HAY' ? '#dc2626' : '#0f172a'}">${appState.bitacoraWeb?.estado === 'SI' ? `SÍ — N° ${appState.bitacoraWeb?.numero || 'SIN NÚMERO'}` : appState.bitacoraWeb?.estado === 'NO HAY' ? 'NO HAY (No existen instrucciones en Bitácora Web)' : 'NO COMPARTIDA'}</span></div>
    <div class="official-line"><span class="official-label">DESCRIPCIÓN DEL CASO:</span><span class="official-value">${ant.tieneRegistroNue === 'NO' ? 'SIN REGISTRO' : (ant.descripcionNue || 'SIN REGISTRAR')}</span></div>
    <div class="official-line"><span class="official-label">RECEPCIÓN (FECHA / HORA):</span><span class="official-value">${ant.tieneRegistroNue === 'NO' ? 'SIN REGISTRO' : `${ant.fechaRecepcion || '--/--/----'} ${ant.horaRecepcion || '--:--'} HRS.`}</span></div>
    <div class="official-line"><span class="official-label">RECEPCIONADO POR:</span><span class="official-value">${ant.tieneRegistroNue === 'NO' ? 'SIN REGISTRO' : `${ant.nombreRecepciona || 'SIN REGISTRAR'} (${ant.institucionRecepciona || 'PDI'})`}</span></div>
    ${ant.fotoNue ? `<div style="margin-top: 10px; text-align: center;"><div class="official-label" style="margin-bottom: 6px;">REGISTRO FOTOGRÁFICO COMPROBANTE NUE:</div><img src="${ant.fotoNue}" alt="FOTO NUE" style="max-height: 250px; border: 1px solid #cbd5e1; border-radius: 4px;"></div>` : ''}

    <div class="official-section-title">XVI. OBSERVACIONES Y EMPADRONADOS</div>
    <div style="padding: 10px 14px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 9.5pt; color: #1e293b; white-space: pre-wrap;">
      ${appState.observacionesFinales ? (appState.incluirEmpadronadoWhatsapp === 'SI' ? `${appState.tipoDeclaracionWhatsapp || 'EMPADRONADO'}:\n${appState.observacionesFinales}` : appState.observacionesFinales) : 'SIN OBSERVACIONES FINALES Y EMPADRONADOS REGISTRADOS.'}
    </div>

    <div class="official-section-title">XVII. DESCRIPCIÓN DEL S.S.</div>
    <div style="padding: 10px 14px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; font-size: 9.5pt; color: #1e293b; white-space: pre-wrap;">
      ${appState.descripcionSS || 'SIN DESCRIPCIÓN DETALLADA REGISTRADA.'}
    </div>

    <div class="official-section-title">XVIII. CONCLUSIÓN DEL EXAMEN Y HORARIOS</div>
    <div class="official-line"><span class="official-label">HORA FIN EXAMEN EXTERNO:</span><span class="official-value">${appState.horaFinExamenExterno || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">HORA FINALIZACIÓN S.S.:</span><span class="official-value">${appState.horaFinSS || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">DATA ESTIMADA DE MUERTE:</span><span class="official-value">${appState.dataMuerte || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">CAUSA PROBABLE DE MUERTE:</span><span class="official-value" style="font-weight: 800; color: #0f172a;">${causaTexto}</span></div>

    <div class="official-section-title">XIX. DESCRIPCIÓN DE VESTIMENTAS Y ESPECIES EXTERNAS</div>
    <div class="official-line"><span class="official-label">PRENDAS SUPERIORES:</span><span class="official-value">${vest.superiores || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">PRENDAS INFERIORES:</span><span class="official-value">${vest.inferiores || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">CALZADO / ABRIGO:</span><span class="official-value">${vest.calzado || 'SIN REGISTRAR'} // ${vest.abrigo || 'SIN REGISTRAR'}</span></div>
    <div class="official-line"><span class="official-label">VESTIMENTA CUERPO ENTERO:</span><span class="official-value">${vest.cuerpoEntero || 'SIN REGISTRAR'}</span></div>
  `;
  
  renderFichaInformativa();
}

// RENDERIZAR FICHA INFORMATIVA
function renderFichaInformativa() {
  const el = document.getElementById('fichaInformativaContent');
  if (!el) return;

  const ant = appState.antecedentes || {};
  const id = appState.fallecido || {};
  const antropo = appState.antropometria || {};
  const dataMuerte = appState.dataMuerte || '';
  const causa = appState.causaProbable || '';
  const lacrim = appState.peritosLacrim || {};
  const clasif = appState.clasificacionCaso || {};
  
  const causaTexto = causa === 'OTRO' ? appState.causaProbableOtro || 'SIN ESPECIFICAR' : causa;
  
  const parseAddress = (str) => {
    if (!str) return { street: '-', number: '-' };
    const s = str.trim();
    const m = s.match(/^(.*?)\s+([0-9]+[a-zA-Z]*)$/);
    if (m) return { street: m[1].trim(), number: m[2].trim() };
    return { street: s, number: '-' };
  };
  const domFallecido = parseAddress(id.domicilio);
  const domSS = parseAddress(appState.comunicacion?.direccionSS || appState.comunicacion?.direccion);
  
  const gepolActivosFicha = [];
  if (appState.comunicacion?.gepol) {
    const gp = appState.comunicacion.gepol;
    if (gp['731']) gepolActivosFicha.push('731');
    if (gp['RETACO']) gepolActivosFicha.push('RETACO');
    if (gp['REORPE']) gepolActivosFicha.push('REORPE');
    if (gp['PREDES']) gepolActivosFicha.push('PREDES');
  }
  const gepolFicha = gepolActivosFicha.length > 0 ? gepolActivosFicha.join(' - ') : 'S/A';

  const t = appState.tecnicosSS || {};
  const ubicacionStr = t.ubicacionCuerpo === 'OTRO' ? (t.ubicacionCuerpoOtro || 'OTRO LUGAR') : (t.ubicacionCuerpo || 'NO REGISTRADO');
  
  let antecedentesDiligenciaStr = '';
  if (ant.tieneAntecedentes === 'NO') {
    antecedentesDiligenciaStr = 'No Mantiene Antecedentes Clínicos';
  } else {
    const antList = [];
    if (ant.situacionCalle) antList.push('SITUACIÓN DE CALLE');
    if (ant.discapacitado) antList.push('DISCAPACIDAD');
    if (ant.drogadiccion) antList.push('DROGADICCIÓN');
    if (ant.alcoholismo) antList.push('ALCOHOLISMO');
    if (ant.otros) antList.push(ant.otros);
    const antTexto = antList.length > 0 ? antList.join(', ') : 'ANTECEDENTES CLÍNICOS REGISTRADOS';
    antecedentesDiligenciaStr = `mantiene antecedentes de ${antTexto}`;
  }

  const empadronadoFicha = (appState.incluirEmpadronadoWhatsapp === 'SI' && appState.observacionesFinales)
    ? `\n\n${appState.tipoDeclaracionWhatsapp || 'EMPADRONADO'}: ${appState.observacionesFinales}`
    : '';

  const modusOperandiStr = `Se realizo trabajo en el S.S, al reconocimiento externo policial el cuerpo se encontró en ${ubicacionStr}, ${antecedentesDiligenciaStr}. Finalmente, de acuerdo con las diligencias practicadas, se realizo empadronamiento y fijación fotográfica.${empadronadoFicha}`;

  let html = `
    <div style="font-family: Arial, sans-serif; font-size: 8pt; line-height: 1.3; max-width: 21.59cm; margin: 0 auto; padding: 0.5cm; background: white; box-shadow: 0 0 10px rgba(0,0,0,0.1); box-sizing: border-box; text-transform: uppercase;" id="fichaInformativaWrapper">
      <style>
        #fichaInformativaWrapper table:not(.no-border), 
        #fichaInformativaWrapper table:not(.no-border) th, 
        #fichaInformativaWrapper table:not(.no-border) td {
          border: 1px solid black !important;
        }
        #fichaInformativaWrapper table.no-border {
          border: none !important;
        }
        #fichaInformativaWrapper table.no-border > tbody > tr > td,
        #fichaInformativaWrapper table.no-border > tr > td {
          border: none !important;
        }
      </style>
      <h2 style="text-align: center; font-size: 12pt; margin-bottom: 8px;">FICHA INFORMATIVA DE CONCURRENCIA</h2>
      <table class="no-border" style="width: 100%; margin-bottom: 8px;" border="0">
        <tr>
          <td style="width: 45%; vertical-align: top; padding: 0;">
            <table style="width: 100%; border-collapse: collapse; text-align: center;" border="1" bordercolor="black">
              <tr><td style="background-color: #92cddc; font-weight: bold; padding: 2px;">POLICIA DE INVESTIGACIONES DE CHILE</td></tr>
              <tr><td style="color: red; font-weight: bold; padding: 2px; background-color: white;">${appState.unidadPolicial || 'BRIGADA DE INVESTIGACIÓN CRIMINAL SAN JAVIER'}</td></tr>
            </table>
          </td>
          <td style="width: 10%;"></td>
          <td style="width: 45%; vertical-align: top; padding: 0;">
            <table style="width: 100%; border-collapse: collapse; text-align: center;" border="1" bordercolor="black">
              <tr>
                <td style="background-color: #92cddc; font-weight: bold; padding: 2px; width: 40%;">N°</td>
                <td style="color: red; font-weight: bold; padding: 2px; width: 30%;"></td>
                <td style="background-color: #92cddc; font-weight: bold; padding: 2px; width: 30%;">ORD</td>
              </tr>
              <tr>
                <td style="background-color: #92cddc; font-weight: bold; padding: 2px;">FECHA:</td>
                <td colspan="2" style="color: red; padding: 2px;">${new Date().toLocaleDateString('es-CL')}</td>
              </tr>
              <tr>
                <td rowspan="2" style="background-color: #92cddc; font-weight: bold; padding: 2px;">COMUNICACION<br>DE LA FISCALIA</td>
                <td style="background-color: #92cddc; font-weight: bold; padding: 2px;">FECHA:</td>
                <td style="color: red; padding: 2px;">${ant.fechaRecepcion ? ant.fechaRecepcion.split('-').reverse().join('-') : '-'}</td>
              </tr>
              <tr>
                <td style="background-color: #92cddc; font-weight: bold; padding: 2px;">HORA:</td>
                <td style="color: red; padding: 2px;">${ant.horaRecepcion || '-'}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>

      <!-- 1- ANTECEDENTES DEL HECHO -->
      <p style="font-weight: bold; margin: 5px 0 2px; font-size: 8pt;">1- ANTECEDENTES DEL HECHO</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; table-layout: fixed;" border="1" bordercolor="black">
        <colgroup>
          <col style="width: 15%;"><col style="width: 25%;"><col style="width: 15%;"><col style="width: 20%;"><col style="width: 15%;"><col style="width: 10%;">
        </colgroup>
        <tr>
          <td style="background-color: #92cddc; font-weight: bold; padding: 2px;">FISCALIA:</td>
          <td colspan="5" style="color: red; padding: 2px;">FLAGRANCIA, FISCAL DE TURNO - ${appState.comunicacion?.fiscalTurno || '-'}</td>
        </tr>
        <tr>
          <td style="background-color: #92cddc; font-weight: bold; padding: 2px;">HECHO:</td>
          <td style="color: red; padding: 2px;">${clasif.subtipo || '-'}</td>
          <td style="background-color: #92cddc; font-weight: bold; padding: 2px;">MODALIDAD:</td>
          <td style="color: red; padding: 2px; text-align: center;">-</td>
          <td style="background-color: #92cddc; font-weight: bold; padding: 2px;">ARMA ESPECIFICA:</td>
          <td style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td style="background-color: #ccc0da; font-weight: bold; padding: 2px;">MARCA Y MODELO:</td>
          <td style="color: red; padding: 2px; text-align: center;">-</td>
          <td style="background-color: #ccc0da; font-weight: bold; padding: 2px;">CALIBRE:</td>
          <td style="color: red; padding: 2px; text-align: center;">-</td>
          <td style="background-color: #ccc0da; font-weight: bold; padding: 2px;">N° SERIE:</td>
          <td style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
      </table>

      <!-- 2- ANTECENDENTES DE LA VICTIMA O FALLECIDO -->
      <p style="font-weight: bold; margin: 5px 0 2px; font-size: 8pt;">2- ANTECENDENTES DE LA VICTIMA O FALLECIDO</p>
      <div style="margin-bottom: 5px;">
        <span style="background-color: #92cddc; font-weight: bold; padding: 2px; border: 1px solid black;">N° VICTIMAS:</span>
        <span style="color: red; padding: 2px; border: 1px solid black; border-left: none; display: inline-block; width: 50px; text-align: center;">1</span>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; table-layout: fixed;" border="1" bordercolor="black">
        <colgroup>
          <col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;">
          <col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;">
          <col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;">
          <col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;"><col style="width: 5%;">
        </colgroup>
        <tr>
          <td colspan="4" style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center;">ESTADO</td>
          <td colspan="16" style="color: red; font-weight: bold; padding: 2px; text-align: center;">FALLECIDA/O</td>
        </tr>
        <tr>
          <td colspan="6" style="background-color: #92cddc; font-weight: bold; text-align: center; padding: 2px;">NOMBRES</td>
          <td colspan="6" style="background-color: #92cddc; font-weight: bold; text-align: center; padding: 2px;">APELLIDO PATERNO</td>
          <td colspan="4" style="background-color: #92cddc; font-weight: bold; text-align: center; padding: 2px;">APELLIDO MATERNO</td>
          <td colspan="4" style="background-color: #92cddc; font-weight: bold; text-align: center; padding: 2px;">APODO</td>
        </tr>
        <tr>
          <td colspan="6" style="color: red; text-align: center; padding: 2px;">${id.nombres || '-'}</td>
          <td colspan="6" style="color: red; text-align: center; padding: 2px;">${id.apellidoPaterno || '-'}</td>
          <td colspan="4" style="color: red; text-align: center; padding: 2px;">${id.apellidoMaterno || '-'}</td>
          <td colspan="4" style="color: red; text-align: center; padding: 2px;">${id.apodo || '-'}</td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #92cddc; font-weight: bold; padding: 2px;">SEXO:</td>
          <td colspan="1" style="color: red; padding: 2px; text-align: center;">${id.sexo || antropo.sexo || '-'}</td>
          <td colspan="3" style="background-color: #92cddc; font-weight: bold; padding: 2px;">DOCUMENTO:</td>
          <td colspan="4" style="color: red; padding: 2px; text-align: center;">${id.nacionalidad === 'CHILENA' || !id.nacionalidad ? 'CÉDULA DE IDENTIDAD' : 'PASAPORTE'}</td>
          <td colspan="1" style="background-color: #92cddc; font-weight: bold; padding: 2px;">N°:</td>
          <td colspan="4" style="color: red; padding: 2px;">${id.run || '-'}</td>
          <td colspan="3" style="background-color: #92cddc; font-weight: bold; padding: 2px;">NACIONALIDAD:</td>
          <td colspan="2" style="color: red; padding: 2px;">${id.nacionalidad || 'CHILENA'}</td>
        </tr>
        <tr>
          <td colspan="6" style="background-color: #92cddc; font-weight: bold; padding: 2px;">PAIS DE NACIMIENTO:</td>
          <td colspan="4" style="color: red; padding: 2px; text-align: center;">CHILE</td>
          <td colspan="6" style="background-color: #92cddc; font-weight: bold; padding: 2px;">CIUDAD DE NACIMIENTO:</td>
          <td colspan="4" style="color: red; padding: 2px; text-align: center;">${id.ciudadNacimiento || '-'}</td>
        </tr>
        <tr>
          <td colspan="6" style="background-color: #92cddc; font-weight: bold; padding: 2px;">FECHA DE NACIMIENTO:</td>
          <td colspan="4" style="color: red; padding: 2px; text-align: center;">${id.fechaNacimiento ? id.fechaNacimiento.split('-').reverse().join('-') : '-'}</td>
          <td colspan="2" style="background-color: #92cddc; font-weight: bold; padding: 2px;">EDAD:</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">${id.edad || antropo.edad || '-'}</td>
          <td colspan="4" style="background-color: #92cddc; font-weight: bold; padding: 2px;">ESTADO CIVIL:</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">${id.estadoCivil || '-'}</td>
        </tr>
        <tr>
          <td colspan="4" style="background-color: #92cddc; font-weight: bold; padding: 2px;">ESCOLARIDAD:</td>
          <td colspan="6" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="6" style="background-color: #92cddc; font-weight: bold; padding: 2px;">PROFESION U OFICIO:</td>
          <td colspan="4" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="4" style="background-color: #92cddc; font-weight: bold; padding: 2px;">DOMICILIO:</td>
          <td colspan="2" style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center;">VIA</td>
          <td colspan="8" style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center;">NOMBRE DE VIA</td>
          <td colspan="2" style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center;">N°</td>
          <td colspan="2" style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center;">DEPTO</td>
          <td colspan="2" style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center;">BLOCK</td>
        </tr>
        <tr>
          <td colspan="4" style="color: red; padding: 2px; font-weight: bold;">PARTICULAR</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="8" style="color: red; padding: 2px; text-align: center;">${domFallecido.street}</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">${domFallecido.number}</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="6" style="background-color: #ccc0da; font-weight: bold; padding: 2px; text-align: center;">INTERSECTA CON</td>
          <td colspan="6" style="background-color: #ccc0da; font-weight: bold; padding: 2px; text-align: center;">VILLA O POBLACION</td>
          <td colspan="4" style="background-color: #ccc0da; font-weight: bold; padding: 2px; text-align: center;">COMUNA</td>
          <td colspan="4" style="background-color: #ccc0da; font-weight: bold; padding: 2px; text-align: center;">REGION</td>
        </tr>
        <tr>
          <td colspan="6" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="6" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="4" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="4" style="color: red; padding: 2px; text-align: center;">MAULE</td>
        </tr>
        <tr>
          <td colspan="6" style="background-color: #ccc0da; font-weight: bold; padding: 2px;">REFIERE ETNIA</td>
          <td colspan="4" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="6" style="background-color: #ccc0da; font-weight: bold; padding: 2px;">EQUIDAD DE GENERO</td>
          <td colspan="4" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="6" style="background-color: #ccc0da; font-weight: bold; padding: 2px;">NOMBRE SOCIAL</td>
          <td colspan="4" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="8" style="background-color: #ccc0da; font-weight: bold; padding: 2px;">SITUACION CALLE</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">${ant.situacionCalle ? 'SI' : 'NO'}</td>
        </tr>
        <tr>
          <td colspan="6" style="background-color: #ccc0da; font-weight: bold; padding: 2px; text-align: center;">DISCAPACIDAD</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">${ant.discapacitado ? 'SI' : 'NO'}</td>
          <td colspan="6" style="background-color: #ccc0da; font-weight: bold; padding: 2px; text-align: center;">TIPO:</td>
          <td colspan="6" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #ccc0da; font-weight: bold; padding: 2px; text-align: center;">CONSUMO DE DROGAS Y/O ALCOHOL AL MOMENTO DEL HECHO</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="4" style="background-color: #ccc0da; font-weight: bold; padding: 2px; text-align: center;">TIPO DROGA:</td>
          <td colspan="6" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="8" style="background-color: #ccc0da; font-weight: bold; padding: 2px; text-align: center;">ANTECEDENTES DE DROGADICCION Y/O ALCOHOLISMO.</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">${ant.drogadiccion || ant.alcoholismo ? 'SI' : 'NO'}</td>
          <td colspan="4" style="background-color: #ccc0da; font-weight: bold; padding: 2px; text-align: center;">TIPO DROGA:</td>
          <td colspan="6" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="10" style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center;">GEPOL</td>
          <td colspan="10" style="color: red; padding: 2px; text-align: center;">${gepolFicha}</td>
        </tr>
        <tr>
          <td colspan="6" style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center;">ARRAIGO</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">NO</td>
          <td colspan="10" style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center;">PREDES</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">${appState.predes || 'NO'}</td>
        </tr>
      </table>

      <!-- OTROS ANTECEDENTES EN CASO CUERPOS NO IDENTIFICADOS... -->
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; table-layout: fixed;" border="1" bordercolor="black">
        <colgroup>
          <col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;">
          <col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;">
        </colgroup>
        <tr>
          <td colspan="10" style="background-color: #8db4e2; font-weight: bold; padding: 2px; text-align: left;">OTROS ANTECEDENTES EN CASO CUERPOS NO IDENTIFICADOS, LACTANTES, FETOS U OSAMENTAS</td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">TIPO</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="1" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">SEXO</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">EDAD APROXIMADA</td>
          <td colspan="1" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">OTROS DATOS</td>
          <td colspan="8" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">IDENTIDAD MADRE</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">DOCUMENTO Nº</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="1" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">NOMBRE</td>
          <td colspan="3" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">IDENTIDAD PADRE</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">DOCUMENTO Nº</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="1" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">NOMBRE</td>
          <td colspan="3" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
      </table>

      <!-- 3- SITIO DEL SUCESO -->
      <p style="font-weight: bold; margin: 5px 0 2px; font-size: 8pt;">3- SITIO DEL SUCESO</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px;" border="1" bordercolor="black">
        <tr>
          <td style="background-color: #d9e1f2; font-weight: bold; padding: 2px;">FECHA CONCURRENCIA</td>
          <td style="color: red; padding: 2px; text-align: center;">${ant.fechaRecepcion ? ant.fechaRecepcion.split('-').reverse().join('-') : '-'}</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">COORDENADAS GPS FORMATO UTM:</td>
          <td colspan="4" style="color: red; padding: 2px; text-align: center;">${appState.comunicacion?.coordenadasGPS || '-'}</td>
        </tr>
        <tr>
          <td style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">LUGAR ESPECIFICO</td>
          <td style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">VIA</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">NOMBRE DE VIA</td>
          <td style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">N°</td>
          <td style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">DEPTO</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">BLOCK</td>
        </tr>
        <tr>
          <td style="color: red; padding: 2px; text-align: center;">-</td>
          <td style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">${domSS.street}</td>
          <td style="color: red; padding: 2px; text-align: center;">${domSS.number}</td>
          <td style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">INTERSECTA CON</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">VILLA O POBLACION</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">COMUNA</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">REGION</td>
        </tr>
        <tr>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">${appState.comunicacion?.comunaSS || '-'}</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">MAULE</td>
        </tr>
        <tr>
          <td colspan="3" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">CONCURRENCIA MEDICO CRIMINALISTA:</td>
          <td style="color: red; padding: 2px; text-align: center;">NO</td>
          <td colspan="3" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">CONCURRENCIA PERITOS DEL LACRIM:</td>
          <td style="color: red; padding: 2px; text-align: center;">${lacrim.concurre || 'NO'}</td>
        </tr>
      </table>
      
      <!-- 3.1- PRINCIPIO DE EJECUCION -->
      <p style="font-weight: bold; margin: 5px 0 2px; font-size: 8pt; page-break-before: always;">3.1- PRINCIPIO DE EJECUCION</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; table-layout: fixed;" border="1" bordercolor="black">
        <colgroup>
          <col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;">
          <col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;">
        </colgroup>
        <tr>
          <td colspan="3" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">FECHA OCURRENCIA</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">${ant.fechaRecepcion ? ant.fechaRecepcion.split('-').reverse().join('-') : '-'}</td>
          <td colspan="3" rowspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">COORDENADAS GPS FORMATO<br>UTM:</td>
          <td colspan="2" rowspan="2" style="color: red; padding: 2px; text-align: center;">${appState.comunicacion?.coordenadasGPS || '-'}</td>
        </tr>
        <tr>
          <td colspan="3" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">BLOQUE HORARIO</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="3" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">LUGAR ESPECIFICO</td>
          <td colspan="3" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">NOMBRE DE VIA</td>
          <td colspan="1" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">N°</td>
          <td colspan="1" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">DEPTO</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">BLOCK</td>
        </tr>
        <tr>
          <td colspan="3" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="3" style="color: red; padding: 2px; text-align: center;">${domSS.street}</td>
          <td colspan="1" style="color: red; padding: 2px; text-align: center;">${domSS.number}</td>
          <td colspan="1" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">-</td>
        </tr>
        <tr>
          <td colspan="3" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">INTERSECTA CON</td>
          <td colspan="3" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">VILLA O POBLACION</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">COMUNA</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">REGION</td>
        </tr>
        <tr>
          <td colspan="3" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="3" style="color: red; padding: 2px; text-align: center;">-</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">${appState.comunicacion?.comunaSS || '-'}</td>
          <td colspan="2" style="color: red; padding: 2px; text-align: center;">MAULE</td>
        </tr>
      </table>

      <!-- 4- RESULTADOS -->
      <p style="font-weight: bold; margin: 5px 0 2px; font-size: 8pt;">4- RESULTADOS:</p>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 8px; table-layout: fixed;" border="1" bordercolor="black">
        <colgroup>
          <col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;">
          <col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;"><col style="width: 10%;">
        </colgroup>
        <tr>
          <td colspan="10" style="background-color: #d9e1f2; font-weight: bold; text-align: center; padding: 2px;">MODUS OPERANDI: (SINTESIS DE LO OCURRIDO, EL QUE Y EL COMO DEL HECHO)</td>
        </tr>
        <tr>
          <td colspan="10" style="color: red; padding: 10px; white-space: pre-wrap;">${modusOperandiStr}</td>
        </tr>
        <tr>
          <td colspan="10" style="background-color: #d9e1f2; font-weight: bold; text-align: center; padding: 2px;">LUGAR DE HALLAZGO O TIPO DE HABITACION</td>
        </tr>
        <tr>
          <td colspan="10" style="color: red; text-align: center; padding: 2px;">INTERIOR DEL DOMICILIO</td>
        </tr>
        <tr>
          <td colspan="5" style="background-color: #d9e1f2; font-weight: bold; text-align: center; padding: 2px;">MOVIL (POR QUE O PARA QUE)</td>
          <td colspan="5" style="background-color: #d9e1f2; font-weight: bold; text-align: center; padding: 2px;">DETALLE MOVIL</td>
        </tr>
        <tr>
          <td colspan="5" style="color: red; text-align: center; padding: 2px;">-</td>
          <td colspan="5" style="color: red; text-align: center; padding: 2px;">-</td>
        </tr>
        <tr>
          <td colspan="4" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">DATO DE ATENCION DE URGENCIA Nº</td>
          <td colspan="1" style="color: red; text-align: center; padding: 2px;">-</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">FECHA</td>
          <td colspan="1" style="color: red; text-align: center; padding: 2px;">-</td>
          <td colspan="1" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">HORA</td>
          <td colspan="1" style="color: red; text-align: center; padding: 2px;">-</td>
        </tr>
        <tr>
          <td colspan="4" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">DIAGNOSTICO</td>
          <td colspan="6" style="color: red; text-align: center; padding: 2px;">-</td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">EXAMEN FINALIZADO</td>
          <td colspan="2" style="color: red; text-align: center; padding: 2px;">${appState.horaFinExamenExterno || '-'}</td>
          <td colspan="1" style="color: red; text-align: center; padding: 2px;">HORAS</td>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">DATA DE MUERTE</td>
          <td colspan="3" style="color: red; text-align: center; padding: 2px;">${appState.dataMuerte || '-'}</td>
        </tr>
        <tr>
          <td colspan="10" style="background-color: #d9e1f2; font-weight: bold; text-align: center; padding: 2px;">CAUSA PROBABLE DE MUERTE</td>
        </tr>
        <tr>
          <td colspan="10" style="color: red; text-align: center; padding: 2px;">${causaTexto}</td>
        </tr>
        <tr>
          <td colspan="10" style="background-color: #d9e1f2; font-weight: bold; text-align: center; padding: 2px;">PROTOCOLO DE AUTOPSIA SERVICIO MEDICO LEGAL:</td>
        </tr>
        <tr>
          <td colspan="10" style="color: red; text-align: center; padding: 2px;">-</td>
        </tr>
        <tr>
          <td colspan="9" style="background-color: #d9e1f2; font-weight: bold; text-align: center; padding: 2px;">EXISTE RELACION DE LA/S VICTIMA/S CON IMPUTADO/S:</td>
          <td colspan="1" style="padding: 2px;"></td>
        </tr>
        <tr>
          <td colspan="10" style="color: red; text-align: center; padding: 2px;">-</td>
        </tr>
        <tr>
          <td colspan="9" style="background-color: #d9e1f2; font-weight: bold; text-align: center; padding: 2px;">HECHO DE CONNOTACION MEDIATICO O SOCIAL:</td>
          <td colspan="1" style="padding: 2px;"></td>
        </tr>
        <tr>
          <td colspan="2" style="background-color: #d9e1f2; font-weight: bold; padding: 2px; text-align: center;">OTRO, SEÑALE:</td>
          <td colspan="8" style="color: red; text-align: center; padding: 2px;">-</td>
        </tr>
      </table>
      
      <div style="margin-top: 30px; display: flex; justify-content: flex-start; align-items: flex-end; gap: 20px;">
        <div style="width: 80%;">
          <table style="width: 100%; border-collapse: collapse;" border="1" bordercolor="black">
            <tr>
              <td style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center; width: 25%;">NOMBRE Y GRADO<br>JEFE DE UNIDAD</td>
              <td style="color: red; padding: 2px; text-align: center; font-weight: bold; white-space: nowrap;">RODRIGO ACUÑA VALERIA<br>SUBPREFECTO<br>BRIGADA DE INVESTIGACIÓN CRIMINAL SAN JAVIER</td>
              <td style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center; width: 10%; vertical-align: middle;">FIRMA</td>
            </tr>
            <tr>
              <td style="background-color: #92cddc; font-weight: bold; padding: 2px; text-align: center;">OFICIAL REDACTOR:</td>
              <td style="color: red; padding: 2px; text-align: left;">${appState.comunicacion?.oficialACargo || 'OFICIAL A CARGO'}</td>
            </tr>
          </table>
        </div>
        <div style="flex: 1; border-bottom: 2px solid black; margin-bottom: 8px;"></div>
      </div>

      <div style="margin-top: 20px;">
        <p style="font-weight: bold; margin-bottom: 5px; font-size: 8pt;">DISTRIBUCION:</p>
        <table style="width: 30%; border-collapse: collapse;" border="1" bordercolor="black">
          <tr><td style="padding: 2px 4px;">PM SUBDIPOL</td><td style="text-align: center; padding: 2px 4px;">1</td></tr>
          <tr><td style="padding: 2px 4px;">REPOL MAULE</td><td style="text-align: center; padding: 2px 4px;">1</td></tr>
          <tr><td style="padding: 2px 4px;">JENADEP</td><td style="text-align: center; padding: 2px 4px;">1</td></tr>
          <tr><td style="padding: 2px 4px;">PM REPOL MAULE</td><td style="text-align: center; padding: 2px 4px;">1</td></tr>
          <tr><td style="padding: 2px 4px;">PROLIN</td><td style="text-align: center; padding: 2px 4px;">1</td></tr>
        </table>
      </div>
    </div>
  `;
  el.innerHTML = html.toUpperCase();
}

// EXPORTACIÓN A IMAGEN JPG (ALTA RESOLUCIÓN)
function exportToJPG() {
  const el = document.getElementById('officialDocumentContent');
  if (!el || typeof html2canvas === 'undefined') {
    showToast('⚠️ Cargando generador de imagen JPG...');
    return;
  }
  
  const redElements = [];
  el.querySelectorAll('*').forEach(node => {
    if (node.style.color === 'red') {
      node.style.color = 'black';
      redElements.push(node);
    }
  });

  const tc = document.getElementById('toastContainer');
  if (tc) tc.style.display = 'none';

  showToast('🖼️ Generando imagen JPG del informe forense...');
  html2canvas(el, {
    scale: 2,
    backgroundColor: '#ffffff',
    useCORS: true
  }).then(canvas => {
    redElements.forEach(node => node.style.color = 'red');
    if (tc) tc.style.display = '';
    const link = document.createElement('a');
    link.download = `INFORME_SITIO_SUCESO_BICRIM_${appState.id || 'SS'}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.95);
    link.click();
    showToast('✅ Imagen JPG guardada y descargada con éxito');
    const modal = document.getElementById('modalExportPdfJpg');
    if (modal) modal.style.display = 'none';
  }).catch(err => {
    redElements.forEach(node => node.style.color = 'red');
    if (tc) tc.style.display = '';
    showToast('⚠️ Error al generar imagen JPG');
  });
}

// EXPORTACIÓN A ARCHIVO PDF OFICIAL EN ANDROID
function exportToPDF() {
  const el = document.getElementById('officialDocumentContent');
  if (!el) return;

  const modal = document.getElementById('modalExportPdfJpg');
  if (modal) modal.style.display = 'none';

  const redElements = [];
  el.querySelectorAll('*').forEach(node => {
    if (node.style.color === 'red') {
      node.style.color = 'black';
      redElements.push(node);
    }
  });

  const tc = document.getElementById('toastContainer');
  if (tc) tc.style.display = 'none';

  showToast('📄 Generando archivo PDF del informe oficial...');

  const opt = {
    margin:       [10, 10, 10, 10],
    filename:     `INFORME_SITIO_SUCESO_BICRIM_${appState.id || 'SS'}.pdf`,
    image:        { type: 'jpeg', quality: 1 },
    html2canvas:  { scale: 4, useCORS: true, backgroundColor: '#ffffff', letterRendering: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['css', 'legacy'] }
  };

  if (typeof html2pdf !== 'undefined') {
    html2pdf().set(opt).from(el).save().then(() => {
      redElements.forEach(node => node.style.color = 'red');
      if (tc) tc.style.display = '';
      showToast('✅ Documento PDF guardado y descargado con éxito');
    }).catch(err => {
      redElements.forEach(node => node.style.color = 'red');
      if (tc) tc.style.display = '';
      showToast('⚠️ Error al generar PDF, abriendo impresión nativa...');
      window.print();
    });
  } else {
    redElements.forEach(node => node.style.color = 'red');
    if (tc) tc.style.display = '';
    window.print();
  }
}

// EXPORTACIÓN DE LA FICHA INFORMATIVA A PDF
function exportFichaToPDF() {
  const el = document.getElementById('fichaInformativaContent');
  if (!el) return;

  const redElements = [];
  el.querySelectorAll('*').forEach(node => {
    if (node.style.color === 'red') {
      node.style.color = 'black';
      redElements.push(node);
    }
  });

  const tc = document.getElementById('toastContainer');
  if (tc) tc.style.display = 'none';

  showToast('📄 Generando archivo PDF de la Ficha Informativa...');

  const opt = {
    margin:       [5, 5, 5, 5],
    filename:     `FICHA_INFORMATIVA_CONCURRENCIA_${appState.id || 'SS'}.pdf`,
    image:        { type: 'jpeg', quality: 1 },
    html2canvas:  { scale: 4, useCORS: true, backgroundColor: '#ffffff', letterRendering: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
    pagebreak:    { mode: ['css', 'legacy'] }
  };

  if (typeof html2pdf !== 'undefined') {
    html2pdf().set(opt).from(el).save().then(() => {
      redElements.forEach(node => node.style.color = 'red');
      if (tc) tc.style.display = '';
      showToast('✅ Ficha Informativa PDF guardada con éxito');
    }).catch(err => {
      redElements.forEach(node => node.style.color = 'red');
      if (tc) tc.style.display = '';
      showToast('⚠️ Error al generar PDF, intente imprimir');
    });
  } else {
    redElements.forEach(node => node.style.color = 'red');
    window.print();
  }
}

// EXPORTACIÓN DE LA FICHA INFORMATIVA A WORD (.doc)
function exportFichaToWord() {
  const el = document.getElementById('fichaInformativaContent');
  if (!el) return;

  showToast('📄 Generando documento Word de la Ficha Informativa...');

  const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Ficha Informativa</title></head><body>";
  const footer = "</body></html>";
  const html = header + el.innerHTML + footer;
  const blob = new Blob(['\\ufeff', html], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `FICHA_INFORMATIVA_CONCURRENCIA_${appState.id || 'SS'}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('✅ Ficha Informativa Word descargada con éxito');
}


// GENERAR RESUMEN PROFESIONAL POR ÍTEMS (ORGANIZADO PARA INFORME / WHATSAPP)
function generateProfessionalSummaryText() {
  const ant = appState.antecedentes || {};
  const f = appState.fallecido || {};
  const c = appState.comunicacion || {};
  const t = appState.tecnicosSS || {};
  const les = appState.lesionesFijadas || [];
  const fotos = appState.fotografias12 || [];
  const fotosListas = fotos.filter(x => x.completada).length;

  return `======================================================
     POLICÍA DE INVESTIGACIONES DE CHILE
   LABORATORIO DE CRIMINALÍSTICA // BICRIM SAN JAVIER
    INFORME CIENTÍFICO TÉCNICO DEL SITIO DEL SUCESO
======================================================

▪ ÍTEM I: OFICIAL A CARGO Y RECEPCIÓN
------------------------------------------------------
• OFICIAL A CARGO   : JORGE PINO AVILA
• N° NUE            : ${ant.nue || 'SIN REGISTRAR'}
• DESCRIPCIÓN NUE   : ${ant.descripcionNue || 'SIN REGISTRAR'}
• FECHA/HORA RECEP. : ${ant.fechaRecepcion || '--/--/----'} ${ant.horaRecepcion || '--:--'} HRS.
• RECEPCIONADO POR  : ${ant.nombreRecepciona || 'SIN REGISTRAR'} (${ant.institucionRecepciona || 'PDI'})

▪ ÍTEM II: FILIACIÓN E IDENTIFICACIÓN DEL FALLECIDO
------------------------------------------------------
• NOMBRE COMPLETO   : ${f.nombres || ''} ${f.apellidoPaterno || ''} ${f.apellidoMaterno || ''}
• CÉDULA / RUN      : ${f.run || 'SIN REGISTRAR'}
• SEXO / EDAD       : ${f.sexo || appState.antropometria?.sexo || 'M'} / ${f.edad || appState.antropometria?.edad || 'SIN REGISTRAR'}
• NACIONALIDAD      : ${f.nacionalidad || 'CHILENA'} ${f.extranjeraCual ? '(' + f.extranjeraCual + ')' : ''}
• DOMICILIO         : ${f.domicilio || 'SIN REGISTRAR'}

▪ ÍTEM III: COMUNICACIÓN Y SITIO DEL SUCESO
------------------------------------------------------
• FECHA COMUNICAC.  : ${c.fecha || '--/--/----'} A LAS ${c.hora || '--:--'} HRS.
• FISCAL DE TURNO   : ${c.fiscalTurno || 'SIN REGISTRAR'}${c.flagrancia === 'SI' ? ', DE LA FISCALÍA DE FLAGRANCIA MAULE' : ''}
• DIRECCIÓN S.S.    : ${c.direccionSS || 'SIN REGISTRAR'}
• UBICACIÓN CUERPO  : ${t.ubicacionCuerpo === 'OTRO' ? (t.ubicacionCuerpoOtro || 'OTRA UBICACIÓN') : (t.ubicacionCuerpo || 'NO REGISTRADA')}
• COORDENADAS GPS   : ${c.coordenadasGPS || 'SIN REGISTRAR'}
• UNIDAD / CUSTODIA : ${c.unidadCustodia || ''} - ${c.funcionarioCustodia || ''}

▪ ÍTEM IV: LESIONES FORENSES FIJADAS (${les.length})
------------------------------------------------------
${les.length === 0 ? '• SIN LESIONES FIJADAS EN EL CROQUIS ANATÓMICO.' : les.map((l, idx) => `  [${idx + 1}] PLANO: ${l.plano}\n      TIPO  : ${l.tipo}\n      DIM.  : ${l.dimension}\n      DESC. : ${l.desc}`).join('\n\n')}

▪ ÍTEM V: CHECKLIST FOTOGRÁFICO PERICIAL
------------------------------------------------------
• FOTOGRAFÍAS FIJADAS: ${fotosListas} DE 12 OBLIGATORIAS (${Math.round((fotosListas/12)*100)}%)
${fotos.map((ft, i) => `  ${ft.completada ? '[✓]' : '[ ]'} ${i + 1}. ${ft.titulo}`).join('\n')}

======================================================
FIRMA OFICIAL A CARGO: JORGE PINO AVILA
UNIDAD: BICRIM SAN JAVIER - PDI
======================================================`.toUpperCase();
}

function openProfessionalSummaryModal() {
  const modal = document.getElementById('modalProfessionalSummary');
  const txt = document.getElementById('summaryTextOutput');
  if (txt) txt.value = generateReporteAmpliacionConcurrenciaText();
  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('active');
  }
}

// GENERAR RESPUESTA AUTOMÁTICA REPORTE Y AMPLIACIÓN DE CONCURRENCIA PARA WHATSAPP
function generateReporteAmpliacionConcurrenciaText() {
  const ant = appState.antecedentes || {};
  const f = appState.fallecido || {};
  const c = appState.comunicacion || {};
  const t = appState.tecnicosSS || {};
  const clas = appState.clasificacionCaso || {};
  const les = appState.lesionesFijadas || [];
  const pl = appState.peritosLacrim || {};

  // FECHA (formato DD.MMM.YYY, ej. 13.JUL.026)
  const formatReportDate = (dateStr) => {
    const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    let d, m, y;
    if (dateStr && dateStr.includes('-')) {
      const parts = dateStr.split('-');
      y = parts[0].slice(-3);
      m = meses[parseInt(parts[1], 10) - 1] || 'ENE';
      d = parts[2].padStart(2, '0');
    } else {
      const now = new Date();
      y = String(now.getFullYear()).slice(-3);
      m = meses[now.getMonth()];
      d = String(now.getDate()).padStart(2, '0');
    }
    return `${d}.${m}.${y}`;
  };
  const fechaStr = formatReportDate(c.fecha);

  // DELITO O HECHO
  const delitoOHechoStr = clas.subtipo || clas.delitoOHecho || 'SIN REGISTRAR';

  // BITÁCORA WEB
  let bitacoraStr = appState.bitacoraWeb?.estado || 'NO HAY';
  if (appState.bitacoraWeb?.estado === 'SI' && appState.bitacoraWeb?.numero) {
    bitacoraStr = `SÍ (${appState.bitacoraWeb.numero})`;
  }

  // FALLECIDO
  const nombreFallecido = [f.nombres, f.apellidoPaterno, f.apellidoMaterno].filter(Boolean).join(' ') || 'SIN IDENTIFICAR';
  const runStr = f.run || 'SIN REGISTRAR';
  
  let nacStr = f.nacionalidad || 'CHILENA';
  if (nacStr === 'EXTRANJERA' && f.extranjeraCual) {
    nacStr = `EXTRANJERA (${f.extranjeraCual})`;
  } else if (f.extranjeraCual) {
    nacStr += ` (${f.extranjeraCual})`;
  }

  const edadStr = f.edad || appState.antropometria?.edad || 'SIN REGISTRAR';

  // GEPOL
  const gepolActivos = [];
  if (c.gepol) {
    if (c.gepol['731']) gepolActivos.push('731');
    if (c.gepol['RETACO']) gepolActivos.push('RETACO');
    if (c.gepol['REORPE']) gepolActivos.push('REORPE');
    if (c.gepol['PREDES']) gepolActivos.push('PREDES');
  }
  const gepolStr = gepolActivos.length > 0 ? gepolActivos.join(' - ') : 'SIN CÓDIGOS GEPOL ACTIVADOS';

  // DIRECCIÓN Y GPS
  const direccionStr = c.direccionSS || 'SIN REGISTRAR';
  const gpsStr = c.coordenadasGPS || 'SIN REGISTRAR';

  // RECONOCIMIENTO EXTERNO DEL CADÁVER
  let reconocimientoStr = '';
  if (clas.presentaLesiones === 'NO') {
    reconocimientoStr = 'NO SE OBSERVARON LESIONES ATRIBUIBLES DE TERCERAS PERSONAS';
  } else if (les.length > 0) {
    const descLesiones = les.map((l, idx) => `${idx + 1}. ${l.tipo} (${l.dimension || 'SIN DIMENSIÓN'}): ${l.desc || ''}`).join('; ');
    reconocimientoStr = descLesiones;
  } else {
    reconocimientoStr = 'SE OBSERVAN LESIONES EN EXAMEN EXTERNO';
  }
  if (appState.observaciones) {
    reconocimientoStr += (reconocimientoStr ? '. ' : '') + appState.observaciones;
  }

  // CAUSA DE MUERTE
  let causaStr = appState.causaProbable || 'INDETERMINADO A LA ESPERA DE LA AUTOPSIA';
  if (causaStr === 'OTRO' && appState.causaProbableOtro) {
    causaStr = appState.causaProbableOtro;
  }

  // DATA DE MUERTE
  const dataMuerteStr = appState.dataMuerte || 'SIN REGISTRAR';

  // CONCURRENCIA PERITOS LACRIM
  let lacrimStr = '';
  if (pl.concurre === 'SI') {
    const esp = [];
    if (pl.fotografiaPlanimetria) esp.push('FOTOGRAFÍA FORENSE Y PLANIMETRÍA');
    if (pl.balistica) esp.push('BALÍSTICA FORENSE');
    if (pl.huellografiaDactilos) esp.push('HUELLOGRAFÍA Y DACTILOSCOPÍA');
    if (pl.informaticaForense) esp.push('INFORMÁTICA FORENSE');
    if (pl.quimicaFisica) esp.push('QUÍMICA Y FÍSICA');
    lacrimStr = esp.length > 0 ? `SÍ (${esp.join(', ')})` : 'SÍ';
  } else {
    lacrimStr = 'NO CONCURREN';
  }

  // DILIGENCIAS
  const fiscalStr = c.fiscalTurno || 'SIN REGISTRAR';
  const ubicacionStr = t.ubicacionCuerpo === 'OTRO' ? (t.ubicacionCuerpoOtro || 'OTRO LUGAR') : (t.ubicacionCuerpo || 'NO REGISTRADO');

  let antecedentesDiligenciaStr = '';
  if (ant.tieneAntecedentes === 'NO') {
    antecedentesDiligenciaStr = 'No Mantiene Antecedentes Clínicos';
  } else {
    const antList = [];
    if (ant.situacionCalle) antList.push('SITUACIÓN DE CALLE');
    if (ant.discapacitado) antList.push('DISCAPACIDAD');
    if (ant.drogadiccion) antList.push('DROGADICCIÓN');
    if (ant.alcoholismo) antList.push('ALCOHOLISMO');
    if (ant.otros) antList.push(ant.otros);
    const antTexto = antList.length > 0 ? antList.join(', ') : 'ANTECEDENTES CLÍNICOS REGISTRADOS';
    antecedentesDiligenciaStr = `mantiene antecedentes de ${antTexto}`;
  }

  const extraDiligencias = appState.observacionesFinales ? ` ${appState.observacionesFinales}` : '';
  const empadronadoWhatsApp = (appState.incluirEmpadronadoWhatsapp === 'SI' && appState.observacionesFinales)
    ? `\n\n▪ *${appState.tipoDeclaracionWhatsapp || 'EMPADRONADO'}:* ${appState.observacionesFinales}`
    : '';

  // NUE
  const nueStr = ant.nue || 'SIN REGISTRAR';

  const reporte = `*REPORTE Y AMPLIACIÓN DE CONCURRENCIA*

*UNIDAD: ${appState.unidadPolicial || 'BICRIM SAN JAVIER'}* / ${fechaStr}
*OFICIAL A CARGO: ${appState.oficialCargo || 'JORGE PINO AVILA'}*

▪ *DELITO O HECHO:* ${delitoOHechoStr}

▪ *BITACORA WEB:* ${bitacoraStr}

▪ *FALLECIDO:* ${nombreFallecido}, CÉDULA DE IDENTIDAD: ${runStr}, NACIONALIDAD: ${nacStr}, EDAD: ${edadStr}

▪ *GEPOL:* ${gepolStr}

▪ *DIRECCIÓN DEL S.S:* ${direccionStr}

▪ *COORDENADAS GPS DEL S.S:* ${gpsStr}

▪ *RECONOCIMIENTO EXTERNO DEL CADÁVER:* ${reconocimientoStr}

▪ *CAUSA DE MUERTE:* ${causaStr}

▪ *DATA DE MUERTE ESTIMADA:* ${dataMuerteStr}

▪ *CONCURRENCIA PERITOS LACRIM:* ${lacrimStr}

▪ *DILIGENCIAS:* Personal del turno de esta BICRIM, por instrucción del Fiscal de Turno ${fiscalStr}, concurrieron al Sitio del Suceso antes señalado, donde se realizo trabajo en el S.S, al reconocimiento externo policial el cuerpo se encontró en ${ubicacionStr}, ${antecedentesDiligenciaStr}. Finalmente, de acuerdo con las diligencias practicadas, se realizo empadronamiento y fijación fotográfica.${empadronadoWhatsApp}

▪ *N° NUE:* ${nueStr}

CUNOCO
--------------------------------------------------
REPORTE DE SISTEMA INTEGRAL FORENSE S.S`;

  return reporte.toUpperCase();
}

// ENVIAR REPORTE AUTOMÁTICO POR WHATSAPP (MODELO REPORTE Y AMPLIACIÓN DE CONCURRENCIA)
function sendQuickWhatsAppReport() {
  const texto = generateReporteAmpliacionConcurrenciaText();
  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
  showToast('📲 Abriendo WhatsApp con Reporte y Ampliación de Concurrencia...');
}



function exportToWord() {
  const el = document.getElementById('officialDocumentContent');
  if (!el) return;

  showToast('📄 Generando documento Word en mayúsculas...');

  const clonedContent = el.cloneNode(true);
  const walker = document.createTreeWalker(clonedContent, NodeFilter.SHOW_TEXT, null, false);
  let node;
  while (node = walker.nextNode()) {
    if (node.nodeValue) {
      node.nodeValue = node.nodeValue.toUpperCase();
    }
  }

  const header = `<html xmlns:o='urn:schemas-microsoft-com:office:office' 
        xmlns:w='urn:schemas-microsoft-com:office:word' 
        xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>INFORME CIENTÍFICO TÉCNICO DEL SITIO DEL SUCESO</title>
        <style>
          body { font-family: 'Arial', sans-serif; font-size: 11pt; color: #0f172a; line-height: 1.5; text-transform: uppercase; }
          .official-header { text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 18px; }
          .official-header h1 { font-size: 14pt; font-weight: bold; margin: 0; }
          .official-tab-header { background-color: #0f172a; color: #ffffff; font-weight: bold; font-size: 11pt; padding: 8px; margin-top: 20px; margin-bottom: 12px; }
          .official-section-title { background-color: #f1f5f9; color: #0f172a; font-weight: bold; font-size: 10.5pt; padding: 6px; border-left: 4px solid #0284c7; margin-top: 14px; margin-bottom: 8px; }
          .official-line { margin-bottom: 6px; }
          .official-label { font-weight: bold; color: #334155; }
          table { width: 100%; border-collapse: collapse; margin-top: 8px; margin-bottom: 12px; }
          th { background-color: #0f172a; color: #ffffff; padding: 6px; border: 1px solid #cbd5e1; }
          td { border: 1px solid #cbd5e1; padding: 6px; }
        </style>
        </head><body>`;
  const footer = "</body></html>";
  const sourceHTML = header + clonedContent.innerHTML + footer;

  const blob = new Blob(['\ufeff', sourceHTML], {
    type: 'application/msword'
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `INFORME_SITIO_SUCESO_BICRIM_${appState.fallecido?.run || appState.id || 'CASO'}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  showToast('✅ Documento Word descargado con éxito');
}

// INICIALIZADOR GENERAL
document.addEventListener('DOMContentLoaded', () => {
  loadFromStorage();
  bindStateToInputs();
  initBodyMapper();
  renderLesionsList();
  renderPhotoChecklist();
  initFotoNueCapture();
  renderFotoNueUI();
  renderOfficialDocument();

  // TRANSFORMAR AUTOMÁTICAMENTE TODOS LOS CAMPOS A MAYÚSCULA AL ESCRIBIR
  document.body.addEventListener('input', (e) => {
    if (e.target && ((e.target.tagName === 'INPUT' && (e.target.type === 'text' || e.target.type === 'search')) || e.target.tagName === 'TEXTAREA')) {
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      e.target.value = e.target.value.toUpperCase();
      if (start !== null && end !== null) {
        try { e.target.setSelectionRange(start, end); } catch(err) {}
      }
    }
  });

  // BOTONES NUEVO Y ELIMINAR
  document.getElementById('btnNewRecord')?.addEventListener('click', createNewRecord);
  document.getElementById('btnDeleteRecord')?.addEventListener('click', deleteCurrentRecord);
  document.getElementById('btnNewRecordBottom')?.addEventListener('click', createNewRecord);
  document.getElementById('btnDeleteRecordBottom')?.addEventListener('click', deleteCurrentRecord);

  // BOTÓN DESPLEGABLE DE HERRAMIENTAS Y GESTIÓN MÓVIL
  document.getElementById('btnToggleToolsMenu')?.addEventListener('click', () => {
    const content = document.getElementById('toolsMenuContent');
    const chevron = document.getElementById('toolsMenuChevron');
    const statusText = document.getElementById('toolsMenuStatusText');
    if (content) {
      const isHidden = content.style.display === 'none' || content.style.display === '';
      content.style.display = isHidden ? 'block' : 'none';
      if (chevron) chevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      if (statusText) statusText.textContent = isHidden ? 'Ocultar' : 'Desplegar';
    }
  });

  // BOTONES MODALES DE EXPORTACIÓN Y RESUMEN PROFESIONAL
  document.getElementById('btnOpenExportPdfJpg')?.addEventListener('click', () => {
    const modal = document.getElementById('modalExportPdfJpg');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  });

  document.getElementById('btnSavePDFModal')?.addEventListener('click', exportToPDF);
  document.getElementById('btnSaveJPGModal')?.addEventListener('click', exportToJPG);

  document.getElementById('btnOpenSummaryModal')?.addEventListener('click', openProfessionalSummaryModal);

  document.getElementById('btnCopyProfessionalSummary')?.addEventListener('click', () => {
    const txt = generateProfessionalSummaryText();
    navigator.clipboard?.writeText(txt).then(() => {
      showToast('📋 Resumen profesional copiado al portapapeles');
    }).catch(() => {
      showToast('✅ Resumen generado');
    });
  });

  document.getElementById('btnWhatsAppSummary')?.addEventListener('click', () => {
    const txt = generateProfessionalSummaryText();
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(txt)}`;
    window.open(url, '_blank');
  });

  document.getElementById('btnSendReportWhatsAppQuick')?.addEventListener('click', sendQuickWhatsAppReport);
  document.getElementById('btnSendReportWhatsAppHeader')?.addEventListener('click', sendQuickWhatsAppReport);

  // SWITCHER PESTAÑAS (CON DESPLAZAMIENTO AUTOMÁTICO A LA PARTE IZQUIERDA)
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const tabId = btn.getAttribute('data-tab');
      document.getElementById(tabId)?.classList.add('active');

      // Auto-desplazar la barra para que la pestaña quede en la izquierda
      const navTabs = document.querySelector('.nav-tabs');
      if (navTabs) {
        const leftPos = Math.max(0, btn.offsetLeft - 14);
        navTabs.scrollTo({ left: leftPos, behavior: 'smooth' });
      }
    });
  });

  // GPS ANDROID
  document.getElementById('btnGetGPS')?.addEventListener('click', () => {
    if ('geolocation' in navigator) {
      showToast('🛰️ Obteniendo GPS en celular Android...');
      navigator.geolocation.getCurrentPosition(pos => {
        const coords = `${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`;
        setNestedValue(appState, 'comunicacion.coordenadasGPS', coords);
        const inp = document.getElementById('coordenadasGPS');
        if (inp) inp.value = coords;
        saveToStorage();
        renderOfficialDocument();
        showToast('📍 Coordenadas fijadas con éxito');
      }, err => {
        showToast('⚠️ No se pudo obtener GPS. Verifique permisos.');
      });
    }
  });

  // TEMA DÍA / NOCHE
  document.getElementById('btnThemeToggle')?.addEventListener('click', () => {
    const isLight = document.body.getAttribute('data-theme') === 'light';
    const icon = document.getElementById('themeIcon');
    if (isLight) {
      document.body.removeAttribute('data-theme');
      if (icon) icon.className = 'fa-solid fa-sun';
      showToast('🌙 Modo Noche activado');
    } else {
      document.body.setAttribute('data-theme', 'light');
      if (icon) icon.className = 'fa-solid fa-moon';
      showToast('☀️ Modo Día institucional activado');
    }
  });

  // EXPORTACIÓN DIRECTA A PDF
  document.getElementById('btnExportReportPDF')?.addEventListener('click', exportToPDF);
  document.getElementById('btnExportFichaPDF')?.addEventListener('click', exportFichaToPDF);

  // RESPALDO JSON - ABRIR MODAL O GUARDAR
  // RESPALDO JSON - ABRIR MODAL O GUARDAR
  const btnExportJson = document.getElementById('btnExportJson');
  const modalBackupJson = document.getElementById('modalBackupJson');
  const btnShareJsonNative = document.getElementById('btnShareJsonNative');
  const btnSaveAsLocal = document.getElementById('btnSaveAsLocal');
  const btnDownloadJsonLocal = document.getElementById('btnDownloadJsonLocal');
  const btnCloseModalBackupJson = document.getElementById('btnCloseModalBackupJson');

  if (btnExportJson && modalBackupJson) {
    btnExportJson.addEventListener('click', (e) => {
      if (e && e.preventDefault) e.preventDefault();
      // Cerrar el menú desplegable si estaba abierto en móvil para no tapar la ventana modal
      const toolsMenuContent = document.getElementById('toolsMenuContent');
      if (toolsMenuContent) toolsMenuContent.style.display = 'none';

      modalBackupJson.style.display = 'flex';
      modalBackupJson.classList.add('active');
    });
  }

  if (btnCloseModalBackupJson && modalBackupJson) {
    btnCloseModalBackupJson.addEventListener('click', () => {
      modalBackupJson.style.display = 'none';
      modalBackupJson.classList.remove('active');
    });
  }

  // BOTÓN 1: ENVIAR POR WHATSAPP/CORREO/DRIVE (WEB SHARE API)
  if (btnShareJsonNative) {
    btnShareJsonNative.addEventListener('click', async () => {
      await shareJsonNative();
    });
  }

  // BOTÓN 2: ELEGIR DÓNDE GUARDAR (SAVE FILE PICKER / FALLBACK)
  if (btnSaveAsLocal) {
    btnSaveAsLocal.addEventListener('click', async () => {
      await saveAsJsonLocal();
    });
  }

  // BOTÓN 3: DESCARGAR A CARPETA DESCARGAS (DOWNLOADS)
  if (btnDownloadJsonLocal) {
    btnDownloadJsonLocal.addEventListener('click', () => {
      downloadJsonLocal();
    });
  }

  function getBackupJsonFilename() {
    const run = appState.fallecido?.run || 'SIN_RUN';
    const nue = appState.antecedentes?.nue || 'SIN_NUE';
    const cleanId = (run !== 'SIN_RUN' ? run : nue).replace(/[^a-zA-Z0-9_-]/g, '_');
    return `SIF-SS_RESPALDO_${cleanId}.json`;
  }

  async function saveAsJsonLocal() {
    try {
      const dataStr = JSON.stringify(appState, null, 2);
      const filename = getBackupJsonFilename();

      if (window.showSaveFilePicker) {
        try {
          const handle = await window.showSaveFilePicker({
            suggestedName: filename,
            types: [
              {
                description: 'Archivo Respaldo JSON',
                accept: { 'application/json': ['.json'] }
              },
              {
                description: 'Archivo de Texto TXT',
                accept: { 'text/plain': ['.txt'] }
              }
            ]
          });
          const writable = await handle.createWritable();
          await writable.write(dataStr);
          await writable.close();
          showToast(`✅ Archivo guardado exitosamente en la ubicación elegida`);
          if (modalBackupJson) {
            modalBackupJson.style.display = 'none';
            modalBackupJson.classList.remove('active');
          }
          return;
        } catch (pickerErr) {
          if (pickerErr.name === 'AbortError') return; // Usuario canceló
          console.warn('showSaveFilePicker cancelado o no soportado:', pickerErr);
        }
      }

      // Si el navegador móvil no soporta showSaveFilePicker, informamos y descargamos o intentamos abrir menú
      showToast('Descargando archivo. Su navegador lo guardará en DESCARGAS o le pedirá confirmar ubicación según su configuración.', 'info');
      downloadJsonLocal();
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error en saveAsJsonLocal:', err);
        downloadJsonLocal();
      }
    }
  }

  async function shareJsonNative() {
    try {
      if (!navigator.share) {
        showToast('⚠️ Su navegador no soporta menú de compartir. Descargando archivo...', 'warning');
        downloadJsonLocal();
        return;
      }

      const dataStr = JSON.stringify(appState, null, 2);
      const filename = getBackupJsonFilename();
      const titleStr = `Respaldo Forense SIF-SS - Caso ${appState.fallecido?.run || appState.antecedentes?.nue || 'SIN_ID'}`;
      const textStr = `Adjunto archivo de respaldo pericial para el caso: ${appState.fallecido?.run || appState.antecedentes?.nue || 'SIN_ID'}. Puede importarse en la aplicación SIF-SS usando el botón 'Importar Respaldo'.`;

      let sharedSuccessfully = false;

      // INTENTO 1: Compartir directamente como archivo .txt (text/plain). Es el formato que Android Web Share acepta al 100% sin bloquear.
      try {
        const filenameTxt = filename.replace(/\.json$/, '.txt');
        const fileTxt = new File([dataStr], filenameTxt, { type: 'text/plain' });
        await navigator.share({
          files: [fileTxt],
          title: titleStr,
          text: textStr
        });
        sharedSuccessfully = true;
      } catch (errTxt) {
        if (errTxt.name === 'AbortError') return; // Usuario cerró el menú libremente
        console.warn('Intento 1 (text/plain) no procedió o falló:', errTxt);
      }

      // INTENTO 2: Si falló como .txt, intentar como archivo .json nativo
      if (!sharedSuccessfully) {
        try {
          const fileJson = new File([dataStr], filename, { type: 'application/json' });
          await navigator.share({
            files: [fileJson],
            title: titleStr,
            text: textStr
          });
          sharedSuccessfully = true;
        } catch (errJson) {
          if (errJson.name === 'AbortError') return;
          console.warn('Intento 2 (application/json) falló:', errJson);
        }
      }

      if (sharedSuccessfully) {
        showToast('✅ Respaldo compartido o enviado exitosamente');
        if (modalBackupJson) {
          modalBackupJson.style.display = 'none';
          modalBackupJson.classList.remove('active');
        }
      } else {
        showToast('⚠️ Su navegador móvil no permitió abrir el menú. Descargando a Descargas...', 'warning');
        downloadJsonLocal();
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error('Error general al compartir:', err);
        showToast('Descargando archivo localmente en su dispositivo...', 'warning');
        downloadJsonLocal();
      }
    }
  }

  function downloadJsonLocal() {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
      const downloadAnchor = document.createElement('a');
      const filename = getBackupJsonFilename();
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", filename);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      if (modalBackupJson) {
        modalBackupJson.style.display = 'none';
        modalBackupJson.classList.remove('active');
      }
      showToast(`📁 Guardado como "${filename}" en su carpeta de DESCARGAS (Download)`);
    } catch (err) {
      console.error('Error al descargar JSON:', err);
      showToast('Error al guardar archivo JSON: ' + err.message, 'error');
    }
  }

  // IMPORTAR RESPALDO JSON
  const btnImportJson = document.getElementById('btnImportJson');
  const importFileInput = document.getElementById('importFile');

  if (btnImportJson && importFileInput) {
    btnImportJson.addEventListener('click', () => {
      importFileInput.click();
    });

    importFileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedState = JSON.parse(event.target.result);
          if (!importedState || typeof importedState !== 'object') {
            throw new Error('Formato de archivo inválido.');
          }

          Object.assign(appState, importedState);
          saveToStorage();
          bindStateToInputs();
          renderLesionsList();
          renderPhotoChecklist();
          renderFotoNueUI();
          renderOfficialDocument();

          showToast('✅ Respaldo JSON importado y restaurado exitosamente');
          importFileInput.value = '';
        } catch (err) {
          console.error('Error al importar JSON:', err);
          showToast('❌ Archivo de respaldo JSON dañado o incompatible: ' + err.message, 'error');
        }
      };
      reader.readAsText(file);
    });
  }

  // INSTALACIÓN PWA EN CELULAR ANDROID (ESTILO RANCHILLO-VENTAS)
  let deferredInstallPrompt = null;

  const hideInstallButtons = () => {
    const btnHeader = document.getElementById('btnOpenInstallAndroid');
    const btnMenu = document.getElementById('btnInstallAndroidMenu');
    const installBanner = document.getElementById('installBanner');
    if (btnHeader) btnHeader.style.display = 'none';
    if (btnMenu) btnMenu.style.display = 'none';
    if (installBanner) installBanner.style.display = 'none';
  };

  window.cerrarBannerInstalacion = () => {
    const installBanner = document.getElementById('installBanner');
    if (installBanner) installBanner.style.display = 'none';
  };

  // Detectar si la app ya está instalada o ejecutándose como app nativa Android
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
    hideInstallButtons();
  }

  window.addEventListener('appinstalled', () => {
    hideInstallButtons();
    showToast('✅ Aplicación forense instalada en pantalla principal');
  });

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const installBanner = document.getElementById('installBanner');
    if (installBanner) installBanner.style.display = 'flex';
  });

  const openInstallModal = () => {
    const modal = document.getElementById('androidInstallModal');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  };

  const closeInstallModal = () => {
    const modal = document.getElementById('androidInstallModal');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
  };

  const handleInstallClick = () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          hideInstallButtons();
          showToast('✅ Aplicación instalada en pantalla principal Android');
        }
        deferredInstallPrompt = null;
      });
    } else {
      openInstallModal();
    }
  };

  document.getElementById('installBtn')?.addEventListener('click', handleInstallClick);
  document.getElementById('btnOpenInstallAndroid')?.addEventListener('click', handleInstallClick);
  document.getElementById('btnInstallAndroidMenu')?.addEventListener('click', handleInstallClick);

  document.getElementById('btnCloseInstallModal')?.addEventListener('click', closeInstallModal);

  document.getElementById('btnTriggerInstallPrompt')?.addEventListener('click', () => {
    if (deferredInstallPrompt) {
      closeInstallModal();
      deferredInstallPrompt.prompt();
      deferredInstallPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          hideInstallButtons();
          showToast('✅ Aplicación instalada en pantalla principal Android');
        }
        deferredInstallPrompt = null;
      });
    } else {
      showToast('ℹ️ Abre el menú (⋮) de Chrome y selecciona "Instalar aplicación" o "Agregar a la pantalla principal"');
    }
  });
});
