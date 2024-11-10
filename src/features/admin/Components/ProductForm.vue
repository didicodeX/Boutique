<script lang="ts" setup>
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useField, useForm } from 'vee-validate'
import { onMounted, ref } from 'vue'

const firstInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  firstInput.value?.focus()
})
/**export interface ProductInterface {
  id: number
  title: string,
  image: string,
  price: number,
  description: string,
  category: Category
}
 */
const required = 'This field is required'
const validationSchema = toTypedSchema(
  z.object({
    title: z
      .string({ message: required })
      .min(1, { message: 'Title must be at least 1 characters' })
      .min(10, { message: 'Title must be at most 10 characters' }),
    image: z.string({ message: required }).min(1, { message: required }),
    price: z
      .number({ message: required })
      .min(0, { message: 'Le prix doit être supérieur à 0€' })
      .max(15000, { message: 'Price must be at most 15.000' }),
    description: z
      .string({ message: required })
      .min(10, { message: 'Description must be at least 10 characters' }),
    category: z.string({ message: required }),
  }),
)
const { handleSubmit, isSubmitting } = useForm({ validationSchema })
// const submitted = ref(false)
const title = useField('title')
const image = useField('image')
const description = useField('description')
const price = useField('price')
const category = useField('category')
// category.value.value = '' // Initialiser avec une chaîne vide

const trySubmit = handleSubmit(async (formValues, { resetForm }) => {
  try {
    await fetch('https://restapi.fr/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
    resetForm()
    firstInput.value?.focus()
  } catch (e) {
    console.error(e)
  }
})

console.log(validationSchema)
</script>

<template>
  <div>
    <div class="card">
      <h3 class="mb-10">Ajouter un article</h3>
      <form @submit="trySubmit">
        <div class="d-flex flex-column mb-20">
          <label for="" class="mb-5">Title</label>
          <input v-model="title.value.value" type="text" />
          <small class="form-error" v-if="title.errorMessage.value">{{
            title.errorMessage.value
          }}</small>
        </div>
        <div class="d-flex flex-column mb-20">
          <label for="" class="mb-5">Image</label>
          <input v-model="image.value.value" type="text" />
          <small class="form-error" v-if="image.errorMessage.value">{{
            image.errorMessage.value
          }}</small>
        </div>
        <div class="d-flex flex-column mb-20">
          <label for="" class="mb-5">Price</label>
          <input v-model="price.value.value" type="number" />
          <small class="form-error" v-if="price.errorMessage.value">{{
            price.errorMessage.value
          }}</small>
        </div>
        <div class="d-flex flex-column mb-20">
          <label for="" class="mb-5">Description</label>
          <textarea v-model="description.value.value as string"></textarea>
          <small class="form-error" v-if="description.errorMessage.value">{{
            description.errorMessage.value
          }}</small>
        </div>
        <div class="d-flex flex-column mb-20">
          <label for="" class="mb-5">Category</label>
          <select
            v-model="category.value.value"
          >
            <option selected disabled value="">Select your Category</option>
            <option value="gamer">Gamer</option>
            <option value="desktop">Desktop</option>
            <option value="streaming">Streaming</option>
          </select>
          <small class="form-error" v-if="category.errorMessage.value">{{
            category.errorMessage.value
          }}</small>
        </div>
        <button type="submit" :disabled="isSubmitting">Save</button>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  margin: 50px auto;
  // width: 100%;
  max-width: 500px;
}

button[type='submit'] {
  background-color: var(--primary-1);
  color: var(--text-primary-color);
  padding: 10px 28px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: var(--primary-2);
  }
}
</style>
