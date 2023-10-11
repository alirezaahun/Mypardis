<template>
  <section class="tw-px-0 tw-py-4 md:tw-px-4 tw-h-full">
    <div class="tw-grid tw-grid-cols-12 tw-h-full">
      <div class="tw-col-span-12 sm:tw-col-span-3" />
      <div class="tw-col-span-12 sm:tw-col-span-6 tw-h-full">
        <div class="tw-flex tw-justify-around tw-items-center tw-h-full">
          <div
            class="tw-px-0 tw-py-4 md:tw-px-4 tw-w-full tw-bg-blend-color-dodge"
          >
            <div class="tw-flex tw-justify-center">
              <NuxtLink to="/">
                <img class="tw-w-32" src="~/assets/images/logos/my-pardis-logo.png" alt="">
              </NuxtLink>
            </div>
            <div class="tw-mt-4 tw-text-center">
              <span>
                {{ $__('signinAndSignupPage') }}
              </span>
            </div>
            <div class="tw-mt-4">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from '~/components/auth/LoginForm'

export default {
  name: 'AuthPage',
  components: { LoginForm },
  layout: 'empty',
}
</script>
