// Properties page — shown only to logged-in users
// Displays a list of property cards using dummy data
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import { useAuth } from '../AuthContext'
import styles from './Properties.module.css'

// Dummy property data (replace with Supabase DB query later)
const DUMMY_PROPERTIES = [
  { id: 1, name: 'サンシャインマンション 301号室', rent: 85000, area: '東京都豊島区' },
  { id: 2, name: 'グリーンヒルズ 102号室',       rent: 72000, area: '神奈川県横浜市' },
  { id: 3, name: 'ブルースカイアパート 205号室',  rent: 65000, area: '埼玉県さいたま市' },
  { id: 4, name: 'パークサイド麻布 801号室',      rent: 180000, area: '東京都港区' },
  { id: 5, name: 'リバービュー梅田 504号室',      rent: 95000, area: '大阪府大阪市北区' },
  { id: 6, name: 'シーサイドコート 301号室',      rent: 78000, area: '神奈川県藤沢市' },
]

export default function Properties() {
  const { session } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    // Sign out clears the Supabase session; AuthContext listener updates state automatically
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.logo}>🏠 不動産管理</h1>
        <div className={styles.userArea}>
          {/* Show the logged-in user's email address */}
          <span className={styles.email}>{session?.user?.email}</span>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            ログアウト
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <h2 className={styles.sectionTitle}>物件一覧</h2>
        <div className={styles.grid}>
          {DUMMY_PROPERTIES.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
    </div>
  )
}

// Separate card component to keep the code clean
function PropertyCard({ property }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>🏢</div>
      <h3 className={styles.cardName}>{property.name}</h3>
      <p className={styles.cardArea}>📍 {property.area}</p>
      <p className={styles.cardRent}>
        ¥{property.rent.toLocaleString()}<span className={styles.perMonth}> / 月</span>
      </p>
    </div>
  )
}
