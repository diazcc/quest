<template>
  <main class="home">
    <header class="home__header"></header>
    <section class="home__container">
      <h1 class="container__title">¡Bienvenido a CyberQuest!</h1>
      <img class="container__header" :src="headerImage" alt="">

      <span class="container__discount">
        <a
          v-for="(discount, index) in discounts"
          :key="index"
          @click="redirectLink(discount, bestSellerImage[0]?.id)"
          class="container__discount-link"
        >
          {{ discount }}% de Descuento
        </a>
      </span>

      <div class="container__best-seller">
        <h2 class="container__best-seller--title">Productos Destacados</h2>
        <span class="container__best-seller__carousel">
          <div class="card" v-for="image in bestSellerImage" :key="image.id"  @click="redirectLink(discount, image.id)">
            <figure class="container__best-seller--figure">
              <img class="container__best-seller--images" :src="image.url" alt="Producto">
              <figcaption class="container__best-seller--description">
                Prenda $3.99
              </figcaption>
            </figure>
          </div>
        </span>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getImages } from '../../services/ApiImages.service.ts';
import { useRouter } from 'vue-router';

const discounts = ref([30, 50, 60]);
const router = useRouter();
const queryImage = 't-shirts';
const headerImage = 'https://quest.vtexassets.com/assets/vtex.file-manager-graphql/images/959d392c-0fa9-4bb0-b27b-0ddcd2377f90___2d55841aa901169d51768b92bf0c7648.jpg';
const bestSellerImage = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(() => {
  fetchData();
});

const fetchData = async () => {
  loading.value = true;
  error.value = null;
  bestSellerImage.value = [];

  try {
    const response = await getImages(queryImage, 15);
    bestSellerImage.value = response.map((data) => ({
      id: data.id,
      url: data.largeImageURL,
    }));
    console.log(bestSellerImage)
  } catch (err) {
    error.value = 'Error al cargar las imágenes';
  } finally {
    loading.value = false;
  }
};

function redirectLink(percentage=0, id) {
  id=id?id:1;
  console.log(percentage,id)
  router.push({ name: 'Discounts', params: { id, percentage } });
}
</script>

<style scoped src="./Home.page.css"></style>
