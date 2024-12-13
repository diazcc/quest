<template>
  <main class="discounts">
    <h1 v-if="percentage !== '0'" class="discounts__title">
      ¡Aprovecha el {{ percentage }}% de Descuento!
    </h1>
    <section>
      <div v-if="loading" class="loading">Cargando...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div class="discounts__content" v-else-if="productImage">
        <img :src="productImage.url" class="discounts__image" />
        <span class="discounts__details">
          <p><strong>ID del producto:</strong> {{ id }}</p>
          <p><strong>Producto:</strong> asdasda</p>
          <p><strong>Precio:</strong> $3.99</p>
          <button class="discounts__button" @click="redirectToWhatsApp">Solicitar producto</button>
        </span>
      </div>
      <div v-else class="error">No se encontró la imagen del producto.</div>
    </section>
  </main>
</template>

<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { getImageById } from '../../services/ApiImages.service';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  percentage: {
    type: String,
    default: '0',
  },
});

const productImage = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchProductImage = async () => {
  loading.value = true;
  error.value = null;

  console.log('ID recibido:', props.id);

  try {
    const response = await getImageById(props.id);
    if (response) {
      productImage.value = {
        url: response.largeImageURL,
        tags: response.tags,
      };
      console.log('Imagen recibida:', productImage.value);
    } else {
      error.value = 'No se encontró ninguna imagen con el ID proporcionado.';
    }
  } catch (err) {
    error.value = 'Error al cargar la imagen: ' + err.message;
  } finally {
    loading.value = false;
  }
};

const redirectToWhatsApp = () => {
  const message = `¡Hola! Me interesa el producto con ID ${props.id} (${productImage.value.tags}) que tiene un descuento del ${props.percentage}% y un precio de 3.99.`;
  const whatsappLink = `https://wa.me/3146724568?text=${encodeURIComponent(message)}`;
  window.open(whatsappLink, '_blank');
};

onMounted(fetchProductImage);
</script>

<style scoped src="./Discounts.page.css"></style>