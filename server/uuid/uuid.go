package uuid

import (
	"github.com/teris-io/shortid"
)

func New() (string, error) {
	return shortid.Generate()
}
