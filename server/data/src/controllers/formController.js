import FormData from '../models/formData.js';

const submitForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await FormData.create({ name, email, message });

    res.status(201).json({ message: '✅ Formulario guardado correctamente' });
  } catch (error) {
    console.error('❌ Error al guardar formulario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

export default submitForm;
