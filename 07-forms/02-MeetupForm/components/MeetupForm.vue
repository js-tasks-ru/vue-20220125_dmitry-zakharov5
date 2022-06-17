<template>
  <form class="meetup-form" @submit="saveChanges">
    <div class="meetup-form__content">
      <fieldset class="meetup-form__section">
        <ui-form-group label="Название">
          <ui-input v-model="clonedMeetup.title" name="title" />
        </ui-form-group>
        <ui-form-group label="Дата">
          <ui-input-date v-model="clonedMeetup.date" type="date" name="date" />
        </ui-form-group>
        <ui-form-group label="Место">
          <ui-input v-model="clonedMeetup.place" name="place" />
        </ui-form-group>
        <ui-form-group label="Описание">
          <ui-input v-model="clonedMeetup.description" multiline rows="3" name="description" />
        </ui-form-group>
        <ui-form-group label="Изображение">
          <!--
               Предлагается сохранять файл для будущей загрузки во временное поле imageToUpload
               и передавать в объекте со всеми данными формы
          -->
          <ui-image-uploader
            name="image"
            :preview="clonedMeetup.image"
            @select="clonedMeetup.imageToUpload = $event"
            @remove="clonedMeetup.imageToUpload = null"
          />
        </ui-form-group>
      </fieldset>

      <h3 class="meetup-form__agenda-title">Программа</h3>

      <meetup-agenda-item-form
        v-for="(elem, index) in clonedMeetup.agenda"
        :key="elem.id"
        :agenda-item="elem"
        class="meetup-form__agenda-item"
        @update:agenda-item="updateAgendaItem(index, $event)"
        @remove="remove(index)"
      />

      <div class="meetup-form__append">
        <button class="meetup-form__append-button" type="button" data-test="addAgendaItem" @click="createItem">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside-stick">
        <!-- data-test атрибуты используются для поиска нужного элемента в тестах, не удаляйте их -->
        <ui-button variant="secondary" block class="meetup-form__aside-button" data-test="cancel" @click="cancel"
          >Отмена</ui-button
        >
        <ui-button variant="primary" block class="meetup-form__aside-button" data-test="submit" type="submit">
          {{ submitText }}
        </ui-button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
  name: 'MeetupForm',
});
</script>

<script setup lang="ts">
import { cloneDeep } from 'lodash';
import MeetupAgendaItemForm from './MeetupAgendaItemForm';
import UiButton from './UiButton';
import UiFormGroup from './UiFormGroup';
import UiImageUploader from '../../../06-wrappers/05-UiImageUploader/components/UiImageUploader.vue';
import UiInput from './UiInput';
import UiInputDate from '../../../06-wrappers/06-UiInputDate/components/UiInputDate.vue';
import { createAgendaItem } from '../meetupService';
import { defineProps, defineEmits, ref, Ref, PropType } from '@vue/runtime-core';
import { AgendaItemType, AgendaType } from '../types/agenda-item.type';

const props = defineProps({
  meetup: {
    type: Object as PropType<AgendaType>,
    required: true,
  },

  submitText: {
    type: String,
    default: '',
  },
});
const emits = defineEmits(['cancel', 'submit']);

const clonedMeetup: Ref<AgendaType> = ref(cloneDeep(props.meetup));
const cancel = (): void => emits('cancel');
const remove = (index: number): void => {
  clonedMeetup.value.agenda.splice(index, 1);
};
const createItem = (): void => {
  const item: AgendaItemType = createAgendaItem();
  if (!clonedMeetup.value.agenda.length) {
    item.startsAt = '07:00';
    item.endsAt = '07:00';
  }
  if (clonedMeetup.value.agenda.length) {
    item.startsAt = clonedMeetup.value.agenda[length - 1].endsAt;
    item.endsAt = item.startsAt;
  }
  clonedMeetup.value.agenda.push(item);
};
const saveChanges = (event: Event): void => {
  event.preventDefault();
  emits('submit', clonedMeetup);
};
const updateAgendaItem = (index: number, newValue: string): void => {
  clonedMeetup.value.agenda[index] = newValue;
};
</script>

<style scoped>
.meetup-form__section {
  border: none;
}

.meetup-form__agenda-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 150%;
  color: var(--body-color);
  margin: 0 0 24px 0;
}

.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside-button {
  margin: 0 0 12px 0;
}

.meetup-form__agenda-item + .meetup-form__agenda-item {
  margin-top: 24px;
}

.meetup-form__append {
  margin-top: 24px;
}

.meetup-form__append-button {
  box-shadow: none;
  border: none;
  background-color: transparent;
  padding: 0;
  outline: none;
  color: var(--blue);
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
}

.meetup-form__append-button:hover {
  text-decoration: underline;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside-stick {
    position: sticky;
    top: 32px;
  }
}
</style>
