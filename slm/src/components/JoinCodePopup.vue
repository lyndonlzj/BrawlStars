<template>
    <v-dialog max-width="600px">
    <v-btn class="b1" slot="activator" text>Join Session</v-btn>
    <v-card>
        <v-card-title>
            <h2>Join Session With Code</h2>
        </v-card-title>
        <v-card-text>
            <v-form>
                  <v-text-field
                    label="Enter Code"
                    name="Code"
                    type="text"
                    prepend-icon="mdi-lock"
                  />
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn class="b1" to="/sessionpage" text>Enter</v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</template>

<script>
export default {
    
}
</script>

<style scoped>

.b1 {
  font-family: "Roboto";
  font-weight: 550;
}
</style>