import Pagination from '@/components/pagination'
import React, { useState } from 'react'

const RealtimeDashboard: React.FC = () => {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  return (
    <div>
      RealtimeDashboard
      <Pagination
        total={1000}
        page={page}
        pageSize={pageSize}
        onPageChange={function (page: number): void {
          setPage(page)
        }}
        onPageSizeChange={function (pageSize: number): void {
          setPageSize(pageSize)
        }}
      />
    </div>
  )
}

export default RealtimeDashboard
