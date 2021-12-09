import { IUseMatrix } from 'hooks/useMatrix'
import { MatrixContainer, MatrixElement, MatrixLayout } from './Matrix.styles'

interface IMatrixProps {
  children: any
  matrix: IUseMatrix
}

const Matrix = ({ children, matrix }: IMatrixProps) => {
  return (
    <MatrixLayout>
      {matrix.isLoading ? (
        <h1>Loading</h1>
      ) : (
        <MatrixContainer
          width={matrix.matrixWidth}
          height={matrix.matrixHeight}
        >
          {matrix.data?.map((line, y) =>
            line.map((height, x) => {
              return (
                <MatrixElement key={y * line.length + x} height={height}>
                  {height}
                </MatrixElement>
              )
            })
          )}
        </MatrixContainer>
      )}

      {children}
    </MatrixLayout>
  )
}

export default Matrix
