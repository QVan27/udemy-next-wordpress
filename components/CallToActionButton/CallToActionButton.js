import { ButtonLink } from 'components/ButtonLink'

export const CallToActionButton = ({ buttonAlign, buttonLabel, buttonDestination }) => {
  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <div className={alignMap[buttonAlign]}>
      <ButtonLink label={buttonLabel} destination={buttonDestination} />
    </div>
  )
}