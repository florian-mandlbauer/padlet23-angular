import {PadletEntryFormComponent} from "./padlet-entry-form.component";

export class ErrorMessage {
  constructor(
    public forControl: string,
    public forValidator: string,
    public text: string
  ) {
  }
}

export const PadletEntryFormErrorMessages = [
  new ErrorMessage('title', 'required', 'Ein Titel muss für den Padlet-Eintrag angegeben werden.'),
  new ErrorMessage('published', 'required', 'Es muss ein Erscheinungsdatum angegeben werden.'),
  new ErrorMessage('rating', 'min', 'Die Bewertung kann nur positive Werte annehmen.'),
  new ErrorMessage('rating', 'max', 'Es ist eine maximale Bewertung von 10 erlaubt.')
];
