import './style.css'


// =========================================
// SERVICES
// =========================================

const servicesShell =
  document.querySelector('.services-shell')

const serviceRows =
  document.querySelectorAll('.service-row')

const servicePreview =
  document.querySelector('#service-preview')

const servicePreviewVisual =
  document.querySelector('#service-preview-visual')

const servicePreviewLabel =
  document.querySelector('#service-preview-label')



function activateService(row) {

  const service =
    row.dataset.service

  const label =
    row.dataset.label


  serviceRows.forEach(
    function (item) {

      item.classList.remove(
        'is-active'
      )

    }
  )


  row.classList.add(
    'is-active'
  )


  servicePreviewVisual.dataset.service =
    service


  servicePreviewLabel.textContent =
    label


  servicePreview.classList.add(
    'is-visible'
  )

}



function hideServicePreview() {

  serviceRows.forEach(
    function (item) {

      item.classList.remove(
        'is-active'
      )

    }
  )


  servicePreview.classList.remove(
    'is-visible'
  )

}



serviceRows.forEach(
  function (row) {

    row.addEventListener(
      'mouseenter',
      function () {

        activateService(row)

      }
    )


    row.addEventListener(
      'focus',
      function () {

        activateService(row)

      }
    )

  }
)



if (servicesShell) {

  servicesShell.addEventListener(
    'mouseleave',
    hideServicePreview
  )

}



// =========================================
// PROJECT START
// =========================================

console.log(
  'Marketing Agency project started'
)