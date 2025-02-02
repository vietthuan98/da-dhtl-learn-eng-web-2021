<template>
  <div class="login-page" :tabindex="-1" @keypress.enter="signIn">
    <v-card width="500px">
      <common-error-text
        class="ma-3 pa-1"
        v-if="message"
        :messageList="[message]"
      />
      <v-form ref="form">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field
            label="Email"
            v-model="email"
            :rules="[Rules.required, Rules.validEmail]"
            persistent-hint
            outlined
            class="required"
          />
          <v-text-field
            v-model="password"
            label="Password"
            :type="!showPassword ? 'Password' : 'text'"
            value="Grocery delivery"
            :rules="[Rules.required, Rules.validPassword]"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
            persistent-hint
            outlined
            class="required"
          />
        </v-card-text>
        <v-card-subtitle>
          <span>
            You dont have any acount?
            <a href="/register">Click here to register an account.</a>
          </span>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn class="ml-auto" depressed color="primary" @click="signIn">
            Sign in
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Rules from "../../../helpers/rules";
import { LoginBody, AuthMutations } from "../constants";
import authApi from "../service";
import TokenServices from "../../../helpers/token";
import { errorMessage } from "../../../helpers/functions";

@Component({})
export default class LoginPage extends Vue {
  @Prop({ default: null }) private value!: string;
  showPassword = false;
  password = "";
  email = "";
  message = "";

  get Rules() {
    return Rules;
  }

  get form() {
    return this.$refs.form as Vue & { validate: () => boolean };
  }

  async signIn() {
    this.message = "";
    const isValid = this.form.validate();
    if (!isValid) return;
    const params: LoginBody = {
      email: this.email,
      password: this.password,
    };
    await this.$store.dispatch("setLoading", true);
    const response = await authApi.login(params);
    await this.$store.dispatch("setLoading", false);
    if (response.success) {
      TokenServices.setUser(response.data.user);
      TokenServices.setToken(response.data.token);
      this.$store.commit(`auth/${AuthMutations.SET_USER}`, response.data.user);
      this.$router.push("/");
    } else {
      await errorMessage(response?.message);
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  .v-card {
    transform: translateY(-20%);
  }
}
</style>
