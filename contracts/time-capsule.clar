;; Blockchain Time Capsule

;; Constants
(define-constant CONTRACT_OWNER tx-sender)
(define-constant ERR_NOT_AUTHORIZED (err u100))
(define-constant ERR_ALREADY_SUBMITTED (err u101))
(define-constant ERR_NOT_FOUND (err u102))
(define-constant ERR_NOT_UNLOCKED (err u103))

;; Data Variables
(define-map time-capsules
  { id: uint }
  {
    owner: principal,
    content: (string-ascii 256),
    unlock-time: uint,
    is-nft: bool,
    nft-id: (optional uint)
  }
)

(define-data-var next-capsule-id uint u1)

;; Read-Only Functions

(define-read-only (get-capsule (capsule-id uint))
  (match (map-get? time-capsules { id: capsule-id })
    capsule (ok capsule)
    (err ERR_NOT_FOUND)
  )
)

(define-read-only (is-capsule-unlocked (capsule-id uint))
  (match (map-get? time-capsules { id: capsule-id })
    capsule (> block-height (get unlock-time capsule))
    false
  )
)

;; Public Functions

(define-public (submit-capsule (content (string-ascii 256)) (unlock-time uint) (is-nft bool) (nft-id (optional uint)))
  (let
    (
      (new-id (var-get next-capsule-id))
    )
    (map-insert time-capsules
      { id: new-id }
      {
        owner: tx-sender,
        content: content,
        unlock-time: unlock-time,
        is-nft: is-nft,
        nft-id: nft-id
      }
    )
    (var-set next-capsule-id (+ new-id u1))
    (ok new-id)
  )
)

