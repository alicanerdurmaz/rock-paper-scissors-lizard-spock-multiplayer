package util

import (
	"encoding/json"
	"net/http"
)

func RespondWithJSON(w http.ResponseWriter, code int, data interface{}) {
	response, err := json.Marshal(data)

	if err != nil {
		RespondWithError(w, http.StatusNotFound, "Json.Marshall error")
	}

	w.Header().Add("content-type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func RespondWithError(w http.ResponseWriter, code int, msg string) {
	RespondWithJSON(w, code, map[string]string{"error": msg})
}
